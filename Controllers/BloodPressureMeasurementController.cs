using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using react_asp.Models;
using System;
using System.Threading.Tasks;


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

                return Ok(new { Records = pagination, TotalPages = pagination.TotalPages, PageIndex = pagination.PageIndex });

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

    }

}
