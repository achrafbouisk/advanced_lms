import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

export async function generateLast12MonthsData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() - i * 28);

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 28);

    const monthYear = endDate.toLocaleDateString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    last12Months.push({
      month: monthYear,
      count,
    });
  }

  return { last12Months };
}
