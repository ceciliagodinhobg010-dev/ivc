//importar o Model
import Material from '../models/material.js'

export default class MaterialController{

    constructor(caminhoBase='material/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Material
            
            await Material.create({
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                categoria: req.body.categoria,
                arquivo: req.body.arquivo,
                capa: req.body.capa
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Material.find({})
            res.render(caminhoBase + 'lst', {Materials:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Material.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Materials:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const Material = await Material.findById(id) 
            console.log(Material)
            res.render(caminhoBase + "edt", 
                {Material:Material})
        }


        this.edt = async(req, res)=>{
        await Material.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Material.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}