using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurpriseU.Data;
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
        // POST: api/Presents/Search
        [HttpPost("Search")]
        public IEnumerable<Present> Search([FromBody]PresentData presentData)
        {
            IQueryable<Present> presents = _context.Presents.Include(p => p.Tags);
            List<Present> res = new List<Present>();
            if (presentData.Tags.Any())
            {

                foreach (var tag in presentData.Tags)
                {
                    var realTag = _context.Tags.Find(tag);

                    var listOfPresents = realTag.Presents;
                    foreach (var pr in listOfPresents)
                    {
                        //presents = presents.Where(p => p.Id == pr.PresentId);
                        res.Add(_context.Presents.Find(pr.PresentId));
                    }

                }
                

            }
            
            if (presentData.EndAge != 0 && presentData.StartAge < presentData.EndAge)
            {
                presents = presents.Where(p => p.StartAge >= presentData.StartAge && p.EndAge <= presentData.EndAge);
                foreach (var pr in presents)
                {
                    if(!res.Contains(pr)) res.Add(pr);
                }
               // res.AddRange(presents.ToList());
                presents = _context.Presents.Include(p => p.Tags);
            }
            else if (presentData.EndAge == 0 && presentData.StartAge != 0)
            {
                presents = presents.Where(p => p.StartAge >= presentData.StartAge);
                foreach (var pr in presents)
                {
                    if (!res.Contains(pr)) res.Add(pr);
                }
                // res.AddRange(presents.ToList());
                presents = _context.Presents.Include(p => p.Tags);

            }
            if (!String.IsNullOrEmpty(presentData.KeyWord))
            {
                presents = presents.Where(p => p.Title.Contains(presentData.KeyWord));
                foreach (var pr in presents)
                {
                    if (!res.Contains(pr)) res.Add(pr);
                }
                presents = _context.Presents.Include(p => p.Tags);
                presents = presents.Where(p => p.Content.Contains(presentData.KeyWord));
                foreach (var pr in presents)
                {
                    if (!res.Contains(pr)) res.Add(pr);
                }
                presents = _context.Presents.Include(p => p.Tags);
                var tags = _context.Tags.Where(t=> t.Name.Contains(presentData.KeyWord));
                foreach (var tag in tags)
                {

                    var listOfPresents = tag.Presents;
                    foreach (var pr in listOfPresents)
                    {
                        //presents = presents.Where(p => p.Id == pr.PresentId);
                        if (!res.Contains(_context.Presents.Find(pr.PresentId))) res.Add(_context.Presents.Find(pr.PresentId));
                    }

                }



            }
            if (presentData.Gender != PresentsGender.All)
            {
                presents = presents.Where(p => p.Gender == presentData.Gender || p.Gender == PresentsGender.All);
                foreach (var pr in presents)
                {
                    if (!res.Contains(pr)) res.Add(pr);
                }
               // presents = _context.Presents.Include(p => p.Tags);
            }


           // if (!res.Any()) res.AddRange(_context.Presents);
           // var result = presents.ToList();
            return res;
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