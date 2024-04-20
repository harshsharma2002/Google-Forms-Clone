type reponseType = "single" | "multilpe" | "subjective" | "survey";

interface responseAnsData {
    [key: string] : string
}

interface responseData {
    title: string;
    description: string;
    type: reponseType;
    response_ans_data: responseAnsData[];
}

export interface requestSchema {
    form_id: string;
    response_data: responseData;
    user_id: string;
}