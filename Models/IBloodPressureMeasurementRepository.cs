using react_asp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IBloodPressureMeasurementRepository
{
    Task<PaginatedList<BloodPressureMeasurement>> GetRecordsByPage(int pageIndex, int pageSize);
    Task<IEnumerable<BloodPressureMeasurement>> GetRecords();
    Task<BloodPressureMeasurement> GetRecordById(int id);
    Task<BloodPressureMeasurement> AddRecord(BloodPressureMeasurement record);
    Task<BloodPressureMeasurement> UpdateRecord(BloodPressureMeasurement record);
    Task<BloodPressureMeasurement> DeleteRecord(int id);

}