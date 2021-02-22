import express, { request, response } from 'express';

const app = express();

/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração Especifica
*/
//http://localhost:3333/users
app.get("/users",(request,response)=>{

    return response.send("Hello World - NLWO4");

});
app.get("/",(request,response)=>{
    return response.redirect("users");
});

app.get("/teste",(request,response)=>{
    return response.json({
        nome: "kaike",
        sobrenome: "rodrigues"
    });
});

app.post("/post",(request,response)=>{
    return response.json(
        {
            message: "Os dados foram salvos com sucesso!"
        }
    )
});



app.listen(3333, () => console.log("Server is running!"));