export interface IPost {
  postId: string;
  title: string;
  companyName: string;
  employmentType: string;
  type: string;
  inService: boolean;
  city: string;
  workYears: number;
  totalWorkYears: number;
  avgHoursPerDay: number;
  monthlySalary: number;
  dailySalary: number;
  hourlySalary: number;
  yearlySalary: number;
  yearEndBonus: number;
  holidayBonus: number;
  profitSharingBonus: number;
  otherBonus: number;
  overtime: string;
  feeling: string;
  jobDescription: string;
  suggestion: string;
  tags: string[];
  status: string;
  rejectReason: string;
  createDate: string;
  updateDate: string;
  updateUser: {
    _id: string;
    account: string;
  };
}
