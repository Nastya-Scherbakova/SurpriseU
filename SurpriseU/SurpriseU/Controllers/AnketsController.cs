using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurpriseU.Models;

namespace SurpriseU.Controllers
{
    [Produces("application/json")]
    [Route("api/Ankets")]
    public class AnketsController : Controller
    {
        private readonly ApplicationContext _context;

        public AnketsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Ankets
        [HttpGet]
        public IEnumerable<Anket> GetAnkets()
        {
            return _context.Ankets;
        }

        // GET: api/Ankets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnket([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var anket = await _context.Ankets.SingleOrDefaultAsync(m => m.Id == id);

            if (anket == null)
            {
                return NotFound();
            }

            return Ok(anket);
        }

        // PUT: api/Ankets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnket([FromRoute] int id, [FromBody] Anket anket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != anket.Id)
            {
                return BadRequest();
            }

            _context.Entry(anket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Ankets
        [HttpPost]
        public async Task<IActionResult> PostAnket([FromBody] Anket anket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Ankets.Add(anket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnket", new { id = anket.Id }, anket);
        }

        // DELETE: api/Ankets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnket([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var anket = await _context.Ankets.SingleOrDefaultAsync(m => m.Id == id);
            if (anket == null)
            {
                return NotFound();
            }

            _context.Ankets.Remove(anket);
            await _context.SaveChangesAsync();

            return Ok(anket);
        }

        private bool AnketExists(int id)
        {
            return _context.Ankets.Any(e => e.Id == id);
        }
    }
}