const asyncHandler = require("express-async-handler");
const Data = require("../models/dataModel");

const getData = asyncHandler(async (req, res) => {
  try {
    const dashboard = await Data.find();
    //console.log("yes");
    res.send(dashboard);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  // console.log(keyword);
});
const getDistinct = asyncHandler(async (req, res) => {
  try {
    const distinctSectors = await Data.distinct("sector");
    const distinctTopics = await Data.distinct("topic");
    const distinctRegions = await Data.distinct("region");
    const distinctPestles = await Data.distinct("pestle");
    const distinctSources = await Data.distinct("source");
    const distinctCountrys = await Data.distinct("topic");
    const distinctEndyear = await Data.distinct("end_year");

    const distinctValues = {
      sectors: distinctSectors,
      topics: distinctTopics,
      region: distinctRegions,
      pestles: distinctPestles,
      sources: distinctSources,
      countrys: distinctCountrys,
      end_year: distinctEndyear,
      // Add more properties as needed
    };

    res.send(distinctValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
const getFData = asyncHandler(async (req, res) => {
  const { topics, sectors, regions, countrys, sortBy, sources, pests } =
    req.body;
  try {
    const matchStage = {};
    if (topics.length > 0) {
      matchStage.topic = { $in: topics };
    }
    if (regions.length > 0) {
      matchStage.region = { $in: regions };
    }
    if (sources.length > 0) {
      matchStage.source = { $in: sources };
    }
    if (pests.length > 0) {
      matchStage.pestle = { $in: pests };
    }
    if (sectors.length > 0) {
      matchStage.sector = { $in: sectors };
    }
    if (countrys.length > 0) {
      matchStage.country = { $in: countrys };
    }
    const sortStage = {};
    if (sortBy.length > 0) {
      sortStage.$sort = {};
      for (const field of sortBy) {
        sortStage.$sort[field] = -1;
      }
    }

    const pipeline = [
      {
        $match: matchStage,
      },
      {
        $addFields: {
          impact: {
            $cond: {
              if: { $eq: ["$impact", ""] },
              then: 0,
              else: { $toInt: "$impact" },
            },
          },
          likelihood: {
            $cond: {
              if: { $eq: ["$likelihood", ""] },
              then: 0,
              else: { $toInt: "$likelihood" },
            },
          },
          intensity: {
            $cond: {
              if: { $eq: ["$intensity", ""] },
              then: 0,
              else: { $toInt: "$intensity" },
            },
          },
          relevance: {
            $cond: {
              if: { $eq: ["$relevance", ""] },
              then: 0,
              else: { $toInt: "$relevance" },
            },
          },
        },
      },
    ];

    if (Object.keys(sortStage).length > 0) {
      pipeline.push(sortStage);
    }

    const data = await Data.aggregate(pipeline);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = { getData, getDistinct, getFData };
