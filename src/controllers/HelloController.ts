import { Request,Response } from "express";

class HelloController {
    async create(request:Request,response:Response){
        return response.send("Hello World - NLWO4");
    }
    async teste(request:Request,response:Response){
        return response.json({
            nome: "kaike",
            sobrenome: "rodrigues"
        });
    }
    async post(request:Request,response:Response){
        return response.json(
            {
                message: "Os dados foram salvos com sucesso!"
            }
        )
    }
}

export { HelloController }