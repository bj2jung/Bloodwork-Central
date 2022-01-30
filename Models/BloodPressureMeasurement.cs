using System.ComponentModel.DataAnnotations;

namespace react_asp.Models
{
    public class BloodPressureMeasurement
    {

        [Key]
        public int RecordId { get; set; }

        [Required]
        public string CreatedDate { get; set; }

        [Required]
        public string ExamDate { get; set; }

        [Required]
        public int SystolicMeasurement { get; set; }

        [Required]
        public int DiastolicMeasurement { get; set; }

        [Required]
        public int HeartRate { get; set; }

        public string Description { get; set; }

    }
}
