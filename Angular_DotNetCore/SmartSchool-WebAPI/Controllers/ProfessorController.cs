using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartSchool_WebAPI.Data;
using SmartSchool_WebAPI.Models;

namespace SmartSchool_WebAPI.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]  
    public class ProfessorController: ControllerBase
    {
        private readonly IRepository _repo;

        public  ProfessorController(IRepository repo){
            _repo =  repo;

        }            

        [HttpGet]
        public async Task<IActionResult> Get(){

            try{                
             var result = await _repo.GetAllProfessoresAsync(true);
             return Ok(result);
            }catch(Exception ex){

              return BadRequest($"Error: {ex.Message}");

            }

            
        }


        [HttpGet("{profId}")]
        public async Task<IActionResult> GetProfessorAsyncById(int profId){
                try{
                
                var result = await _repo.GetProfessorAsyncById(profId,true);
                return Ok(result);


                }catch(Exception ex){

                     return BadRequest($"Error: {ex.Message}");

                }

                 
        }


        [HttpGet("Byaluno/{alunoid}")]
        public async Task<IActionResult> GetProfessoresAsyncByAlunoId(int alunoid){
                try{
                
                var result = await _repo.GetProfessoresAsyncByAlunoId(alunoid,false);
                return Ok(result);


                }catch(Exception ex){

                     return BadRequest($"Error: {ex.Message}");

                }

                
        }

        [HttpPost]
        public async Task<IActionResult> Post(Professor prof){

            try{
            
             _repo.Add(prof);
            if(await _repo.SaveChangesAsync()){
                return Ok(prof);
            }

            }catch(Exception ex){

                return BadRequest($"Error: {ex.Message}");

            }
            

            return BadRequest();

        }


         [HttpPut("{profId}")]
        public async Task<IActionResult> Put(int profId, Professor prof){

            try{
            
            var professor =  _repo.GetProfessorAsyncById(profId,false);
            if(professor == null) return NotFound("Professor não Localizado");

            _repo.Update(prof);
            if(await _repo.SaveChangesAsync()){
                return Ok(prof);
            }
            }catch(Exception ex){

                return BadRequest($"Error: {ex.Message}");
            }          

            return BadRequest();

        }


         [HttpDelete("{profId}")]
        public async Task<IActionResult> Delete(int profId){

            try{
            
            var Getprofessor = await  _repo.GetProfessorAsyncById(profId,false);
            
            if(Getprofessor == null) return NotFound("Professor não Localizado");

            _repo.Delete(Getprofessor);
            if(await _repo.SaveChangesAsync()){
                return Ok();
            }
            }catch(Exception ex){

                return BadRequest($"Error: {ex.Message}");
            }          

            return BadRequest();

        }
        
    }
}