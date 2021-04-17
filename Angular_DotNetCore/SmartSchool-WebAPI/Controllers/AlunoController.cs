using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartSchool_WebAPI.Data;
using SmartSchool_WebAPI.Models;

namespace SmartSchool_WebAPI.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly IRepository _repo;
        public AlunoController(IRepository repo)
        {
            _repo = repo;
        }


        [HttpGet]        
        public async Task<IActionResult> Get(){
          try  {

              var result = await _repo.GetAllAlunosAsync(true);
              return Ok(result);

          }
          catch(Exception ex ){
              return BadRequest($"Erro:{ex.Message}");

          }
        }

        
        [HttpGet("alunoId")]        
        public async Task<IActionResult> GetByAlunoId(int alunoId){
          try  {

              var result = await _repo.GetAlunoAsyncById(alunoId,true);
              return Ok(result);

          }
          catch(Exception ex ){
              return BadRequest($"Erro:{ex.Message}");

          }
        }


        [HttpGet("Bydisciplina/{disciplinaId}")]
        public async Task<IActionResult>GetByDisciplinaId(int disciplinaId){
            try{
                var result =  await _repo.GetAlunosAsyncByDisciplinaId(disciplinaId,false);
                return Ok(result);

            }catch(Exception ex ){
              return BadRequest($"Erro:{ex.Message}");

          }
        }
  

        [HttpPost]
        public async Task<IActionResult> Post(Aluno aluno){
            try{
                 _repo.Add(aluno);

                 if(await _repo.SaveChangesAsync()){
                     return Ok(aluno);
                 }
            
            }catch(Exception ex ){
              return BadRequest($"Erro:{ex.Message}");

          }

          return BadRequest();
        }

        [HttpPut("alunoId")]
        public async Task<IActionResult> Put(int alunoId, Aluno aluno){
            try{

                var Getaluno = await _repo.GetAlunoAsyncById(alunoId,false);

                if(Getaluno == null) return NotFound();

                 _repo.Update(aluno);

                 if(await _repo.SaveChangesAsync()){
                     return Ok(aluno);
                 }
            
            }catch(Exception ex ){
              return BadRequest($"Erro:{ex.Message}");

          }

          return BadRequest();
        }


        
        [HttpDelete("{alunoId}")]
        public async Task<IActionResult> Delete(int alunoId){
            try{

                var Getaluno = await _repo.GetAlunoAsyncById(alunoId,false);

                if(Getaluno == null) return NotFound();

                 _repo.Delete(Getaluno);

                 if(await _repo.SaveChangesAsync()){
                     return Ok();
                 }
            
            }catch(Exception ex ){
              return BadRequest($"Erro:{ex.Message}");

          }

          return BadRequest();
        }


    }
}