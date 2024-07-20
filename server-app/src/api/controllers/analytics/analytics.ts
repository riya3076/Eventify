// Coded by Dharven Doshi
import { Request, Response } from "express";
import Event from "../../../models/Event";
import sendResponse from "../../../utils/response";

type PriceRanges = {
  [key: string]: number;
};

export const getEventData = async (req: Request<{}, {}>, res: Response) => {
  try {
    const categoryAnalytics = await Event.aggregate([
      {
        $unwind: "$categories",
      },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const priceRangeAnalytics = await Event.aggregate([
      {
        $bucket: {
          groupBy: "$price",
          boundaries: Array.from({ length: 21 }, (_, i) => i * 50),
          default: "Above 1000",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    let allPriceRanges: PriceRanges = {};
    for (let i = 0; i < 1000; i += 50) {
      const range = `${i}-${i + 49}`;
      allPriceRanges[range] = 0;
    }

    priceRangeAnalytics.forEach(({ _id, count }) => {
      if (_id !== "Above 1000") {
        const range = `${_id}-${_id + 49}`;
        allPriceRanges[range] = count;
      }
    });

    const formattedPriceRanges = Object.entries(allPriceRanges).map(
      ([range, count]) => ({
        range,
        count,
      })
    );

    return sendResponse(res, 200, {
      success: true,
      message: "Event analytics ready!",
      data: {
        categoryCounts: categoryAnalytics.map((cat) => ({
          category: cat._id,
          count: cat.count,
        })),
        priceRanges: formattedPriceRanges,
      },
    });
  } catch (error) {
    console.error("Error fetching event analytics:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Failed to fetch event analytics",
    });
  }
};
