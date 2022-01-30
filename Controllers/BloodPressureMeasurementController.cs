using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using react_asp.Models;
using System;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace react_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodPressureMeasurementController : ControllerBase
    {
        private readonly IBloodPressureMeasurementRepository _db;
        public BloodPressureMeasurementController(IBloodPressureMeasurementRepository db)
        {
            _db = db;
        }

        [HttpGet("page/{page:int}")]
        public async Task<ActionResult> GetRecordsByPage(int page)
        {
            try
            {
                var pagination = await _db.GetRecordsByPage(page, 5);

                return Ok(new {Records = pagination, TotalPages = pagination.TotalPages, PageIndex = pagination.PageIndex });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Database Error");
            }

        }

        [HttpGet]
        public async Task<ActionResult> GetRecords()
        {
            try
            {
                return Ok(await _db.GetRecords());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Database Error");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BloodPressureMeasurement>> GetRecordById(int id)
        {
            try
            {

                var foundResult = await _db.GetRecordById(id);
                if (foundResult == null)
                {
                    return NotFound();
                }

                return Ok(foundResult);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Database Error");
            }
        }


        [HttpPost]
        public async Task<ActionResult<BloodPressureMeasurement>> AddRecord(BloodPressureMeasurement record)
        {
            try
            {
                if (record == null)
                {
                    return BadRequest();
                }

                var createdRecord = await _db.AddRecord(record);

                return CreatedAtAction(nameof(GetRecordById), new { id = createdRecord.RecordId }, createdRecord);

            }
            catch (Exception)
            {


                return StatusCode(StatusCodes.Status500InternalServerError, "Database Error");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<BloodPressureMeasurement>> UpdateRecord(int id, BloodPressureMeasurement record)
        {
            try
            {
                if (id != record.RecordId)
                {
                    return BadRequest("Id mismatch");
                }

                var recordToUpdate = await _db.GetRecordById(id);

                if (recordToUpdate == null)
                {
                    return NotFound("Record not found");
                }

                return await _db.UpdateRecord(record);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Database Error");

            }
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult<BloodPressureMeasurement>> DeleteRecord(int id)
        {
            try
            {
                var recordToDelete = await _db.GetRecordById(id);
                if (recordToDelete == null)
                {
                    return BadRequest("Record does not exist");
                }
                return await _db.DeleteRecord(id);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Database Error");

            }
        }

        // public async Task<ActionResult<IEnumerable<BloodPressureMeasurement>>> SearchRecords(){
    }








    //// }
    //// GET: BloodPressureMeasurementController
    ////[HttpGet("{page}")]
    //[HttpGet]
    //public async Task<IActionResult> Get(int page = 1)
    //{

    //    {
    //        var instance = await PaginatedList<BloodPressureMeasurementRepository>.CreateAsync(_db.BloodPressureMeasurement, page, 5);
    //        return Json(new { records = instance, totalPages = instance.TotalPages, pageIndex = instance.PageIndex, });

    //    }
    //}



    //[Route("api/[controller]")]
    // [ApiController]
    //public class BloodPressureMeasurementController : ControllerBase
    //{
    //    private readonly ApplicationDbContext _db;
    //    [BindProperty]
    //    public BloodPressureMeasurementRepository BloodPressureMeasurement { get; set; }

    //    public BloodPressureMeasurementController(ApplicationDbContext db)
    //    {
    //        _db = db;
    //    }




    //    }

    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<BloodPressureMeasurementRepository>> Get(int id)
    //    {
    //        try
    //        {

    //        }
    //        catch
    //        {
    //            return StatusCode(StatusCodes.Status500InternalServerError, "Database Error!");

    //        }
    //        var result = await _db.BloodPressureMeasurement.Get
    //        return result;
    //    }




    //    //// GET: BloodPressureMeasurementController/Details/5
    //    //public ActionResult Details(int id)
    //    //{
    //    //    return View();
    //    //}

    //    //// GET: BloodPressureMeasurementController/Create
    //    //public ActionResult Create()
    //    //{
    //    //    return View();
    //    //}


    //    [HttpPost]
    //    public async Task<ActionResult<BloodPressureMeasurementRepository>> Post(BloodPressureMeasurementRepository record)
    //    {
    //        try
    //        {
    //            if (record == null)
    //            {
    //                return BadRequest();
    //            }

    //            var createdRecord = await _db.BloodPressureMeasurement.

    //        }

    //        catch
    //        {
    //            return StatusCode(StatusCodes.Status500InternalServerError, "Database Error!");
    //        }
    //    }






    //    // POST: BloodPressureMeasurementController/Create
    //    // [HttpPost]
    //    // public async Task<ActionResult<BloodPressureMeasurement>> Post(BloodPressureMeasurement record)
    //    // // public JsonResult Post()
    //    // {
    //    //     // return Json(new { asdf = "asdf" });
    //    //     //JSON serialize
    //    //     // var record = new BloodPressureMeasurement();
    //    //     // record.Date = "2000-01-01";
    //    //     // record.Reading1 = "24/5";
    //    //     // record.Reading2 = "24/5";


    //    //     _db.BloodPressureMeasurement.Add(record);


    //    //     // _db.BloodPressureMeasurement.Add(record);
    //    //     _db.SaveChanges();

    //    //     return true;
    //    //     //    try
    //    //     //    {

    //    //     //    }
    //    //     //    catch
    //    //     //    {
    //    //     //         return Json(new {message = "Server Error"});
    //    //     //    }
    //    // }








    //    //// GET: BloodPressureMeasurementController/Edit/5
    //    //public ActionResult Edit(int id)
    //    //{
    //    //    return View();
    //    //}

    //    //// POST: BloodPressureMeasurementController/Edit/5
    //    //[HttpPost]
    //    //[ValidateAntiForgeryToken]
    //    //public ActionResult Edit(int id, IFormCollection collection)
    //    //{
    //    //    try
    //    //    {
    //    //        return RedirectToAction(nameof(Index));
    //    //    }
    //    //    catch
    //    //    {
    //    //        return View();
    //    //    }
    //    //}

    //    //// GET: BloodPressureMeasurementController/Delete/5
    //    //public ActionResult Delete(int id)
    //    //{
    //    //    return View();
    //    //}

    //    //// POST: BloodPressureMeasurementController/Delete/5
    //    //[HttpPost]
    //    //[ValidateAntiForgeryToken]
    //    //public ActionResult Delete(int id, IFormCollection collection)
    //    //{
    //    //    try
    //    //    {
    //    //        return RedirectToAction(nameof(Index));
    //    //    }
    //    //    catch
    //    //    {
    //    //        return View();
    //    //    }
    //    //}
    //}
}
