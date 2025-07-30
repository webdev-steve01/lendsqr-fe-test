declare global {
  type User = {
    user_id: string;
    fullname: string;
    organization: string;
    email: string;
    phone: number;
    date_joined: string;
    status: 0 | 1 | 2 | 3;
    marital_status: 0 | 1;
    type_of_residence: "Parent's house" | "Owned apartment";
    employment_status: 0 | 1;
    sector_of_employment: string;
    duration_of_employment: string;
    office_email: string;
    pay_range: string;
    gender: 0 | 1;
    bvn: number;
    number_of_children: number;
    loan_repayment: string;
    level_of_education: "B.Sc" | "HND" | "PhD";
    socials: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
    guarantors: {
      fullname: string;
      phone: number;
      email: string;
      relationship: string;
    }[];
    user_tier: 0 | 1 | 2;
    amount_they_have: string;
    bank_name: string;
    bank_account: number;
  };
}

export {};
