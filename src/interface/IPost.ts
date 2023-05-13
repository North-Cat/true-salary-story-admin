export interface IPost {
    _id: string;
    title: string;
    companyName: string;
    taxId: string;
    type: string;
    inService: boolean;
    city: string;
    workYears: number;
    totalWorkYears: number;
    avgHoursPerDay: number;
    monthlySalary: number;
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
    createdAt: string;
    updatedAt: string;
    updateUser: {
        _id: string,
        account: string
    };
}