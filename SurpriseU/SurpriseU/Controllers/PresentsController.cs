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
    [Route("api/Presents")]
    public class PresentsController : Controller
    {
        private readonly ApplicationContext _context;

        public ActionResult Index()
        {
            return View(_context.Presents.ToList());
        }

        public PresentsController(ApplicationContext context)
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
        public async Task<IActionResult> GetPresent([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var present = await _context.Presents.SingleOrDefaultAsync(m => m.Id == id);

            if (present == null)
            {
                return NotFound();
            }

            return Ok(present);
        }
        // GET: api/Presents/cupcake
        [HttpGet("Search/{presentTitle}")]
        public IEnumerable<Present> Search([FromRoute] string presentTitle, [FromQuery] int? startAge, [FromQuery] int endAge, [FromQuery] PresentsGender gender, [FromQuery] List<string> tagIds)
        {
            IQueryable<Present> presents = _context.Presents.Include(p => p.Tags);
            if (startAge != 0 && endAge != 0 && startAge < endAge)
            {
                presents = presents.Where(p => p.StartAge >= startAge && p.EndAge <= endAge);
            }
            if (!String.IsNullOrEmpty(presentTitle))
            {
                presents = presents.Where(p => p.Title.Contains(presentTitle));
            }
            if (gender != PresentsGender.All)
            {
                presents = presents.Where(p => p.Gender == gender || p.Gender == PresentsGender.All);
            }

            if (tagIds.Any())
            {

                foreach (var tag in tagIds)
                {
                    var realTag = _context.Tags.Find(tag);
                    var realTag1 = _context.Tags.Where(t=> tagIds.Contains(t.Id)).Select(t=> t.Id).ToList();
                    var listOfPresents = realTag.Presents;
                    foreach (var pr in listOfPresents)
                    {
                        presents = presents.Where(p => p.Id == pr.PresentId);
                    }

                }

            }

            var result = presents.ToList();
            return result;
        }

        // PUT: api/Presents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPresent([FromRoute] string id, [FromBody] Present present)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != present.Id)
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

        //public IActionResult Post([FromBody]Present present)
        //{


        //    _context.Presents.Add(present);
        //    _context.SaveChanges();
        //    return Ok(present);
        //}
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Present present)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            present.Id = Guid.NewGuid().ToString();
            present.Tags.ForEach(delegate (PresentTag tag)
            {
                tag.PresentId = present.Id;
                tag.Present = present;
                tag.Tag = _context.Tags.Find(tag.TagId);
            });
            _context.Presents.Add(present);


            await _context.SaveChangesAsync();


            return CreatedAtAction("GetPresent", new { id = present.Id }, present);
        }

        // DELETE: api/Presents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePresent([FromRoute] string id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var present = await _context.Presents.SingleOrDefaultAsync(m => m.Id == id);
            if (present == null)
            {
                return NotFound();
            }

            _context.Presents.Remove(present);
            await _context.SaveChangesAsync();

            return Ok(present);
        }

        private bool PresentExists(string id)
        {
            return _context.Presents.Any(e => e.Id == id);
        }
    }
}