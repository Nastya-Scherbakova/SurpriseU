﻿using System;
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
    [Route("api/Presents")]
    public class PresentsController : Controller
    {
        private readonly PresentsContext _context;

        public PresentsController(PresentsContext context)
        {
            _context = context;
        }
        [BindProperty]
        public Present Present { get; set; }

        // GET: api/Presents
        [HttpGet]
        public IEnumerable<Present> GetPresents()
        {
            return _context.Presents;
        }

        // GET: api/Presents/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPresent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var present = await _context.Presents.SingleOrDefaultAsync(m => m.PresentId == id);

            if (present == null)
            {
                return NotFound();
            }

            return Ok(present);
        }

        // PUT: api/Presents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPresent([FromRoute] int id, [FromBody] Present present)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != present.PresentId)
            {
                return BadRequest();
            }

            _context.Entry(present).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PresentExists(id))
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

        // POST: api/Presents
        [HttpPost]
        public async Task<IActionResult> PostPresent([FromBody] Present present)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Presents.Add(present);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPresent", new { id = present.PresentId }, present);
        }

        // DELETE: api/Presents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePresent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var present = await _context.Presents.SingleOrDefaultAsync(m => m.PresentId == id);
            if (present == null)
            {
                return NotFound();
            }

            _context.Presents.Remove(present);
            await _context.SaveChangesAsync();

            return Ok(present);
        }

        private bool PresentExists(int id)
        {
            return _context.Presents.Any(e => e.PresentId == id);
        }
    }
}