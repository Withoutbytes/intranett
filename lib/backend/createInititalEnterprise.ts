import { CompanyModel } from "./company/company.model";

export const createInititalEnterprise = async () => {
    const count = await CompanyModel.count();
    if (count === 0)
        await CompanyModel.create({ name: "Workmize" });
}