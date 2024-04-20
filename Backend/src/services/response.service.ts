import { Prisma, PrismaClient } from "@prisma/client";
import { requestSchema } from "../types/response.types";
import { FormData } from "../types/form.types";


function _verifyResponse(form_data: FormData['form_data'], responseData: requestSchema): { correct: number; total: number; } {
    if (form_data.type === 'single') {
        let correct = 0;
        for (let i = 0; i < form_data.question_data.length; i++) {
            const question = form_data.question_data[i];
            const response = responseData.response_data.response_ans_data[i];
            const selectedOption = Object.values(response)[0];
            const optionIndex = question.options.findIndex(option => option.content === selectedOption);
            if (optionIndex !== -1 && question.options[optionIndex].is_correct) {
                correct++;
            }
        }
        return { correct, total: form_data.question_data.length };
    } else if (form_data.type === 'multiple') {
        let correct = 0;
        for (let i = 0; i < form_data.question_data.length; i++) {
            const question = form_data.question_data[i];
            const response = responseData.response_data.response_ans_data[i];
            let isQuestionCorrect = true;
            for (const option of question.options) {
                const selectedOption = response[`option${option.content}`];
                if (!!selectedOption !== option.is_correct) {
                    isQuestionCorrect = false;
                    break;
                }
            }
            if (isQuestionCorrect) {
                correct++;
            }
        }
        return { correct, total: form_data.question_data.length };
    } else {
        throw new Error('Unsupported form type');
    }
}

export const CreateResponse = async (data: requestSchema) =>{
const prisma = new PrismaClient();
    try{
        const dbResponseGetForm = await prisma.form.findUnique({
            where: {
                id: data.form_id
            }
        })
        const form_data = dbResponseGetForm!.form_data as unknown as FormData['form_data'];
        if(form_data!.type === 'single' || form_data!.type === 'multiple'){
            const {correct, total} = _verifyResponse(form_data, data);
            data.response_data["score"] = `${correct}/${total}`;

        }
        const dbResponse = await prisma.response.create({
            data: {
                created_by: data.user_id,
                form_id: data.form_id,
                response_data: data.response_data as unknown as Prisma.InputJsonValue,
            }
        }
        )
        return dbResponse;
    } catch(err){
        return err;
    } finally {
        await prisma.$disconnect();
    }
}

export const FindOneResponse = async (data: string) =>{
    const prisma = new PrismaClient();
    try{
        const dbResponse = await prisma.response.findUnique({
            where: {
                id: data
            }
        })
        return dbResponse;
    } catch(err){
        return err;
    } finally {
        await prisma.$disconnect();
    }
}

export const FindAllResponse = async (data: string) =>{
    console.log("hi");
    const prisma = new PrismaClient();
    try{
        const dbResponse = await prisma.response.findMany({
            where: {
                created_by: data
            }
        })
        return dbResponse;
    } catch(err){
        return err;
    } finally {
        await prisma.$disconnect();
    }
}