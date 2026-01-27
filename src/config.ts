import moment from "moment";
import { ColorSchemeIdentifier, GroupedRadarInterface, IntegratedPropertyName, LangCode, Language, TimeDisplayedAsValue, TimeInterval } from "./CrowTypes";

const globalChartMarginLeft = 65; // In-svg margin used for axis and legend
const globalChartMarginRight = 60; // In-svg margin used for axis and legend
const svgWidth = 72 * (60 / 15 * 2.5) + globalChartMarginLeft + globalChartMarginRight;
// The chart width (svgWidth) should have enough pixels to display:
// - max number of visible hours (72, see availableTimeIntervals)
// - resolution per hour (60 / appTemporalResolution in minutes)
// - an optional multiplier to scale up or down (1.5)

const meteoBeUrlTemplate = 'https://opendata.meteo.be/ftp/observations/radar/vbird/{odimCode}/{yyyy}/{odimCode}_vpts_{yyyymmdd}.txt'
const aloftNexradUrl = "https://s3.us-east-1.amazonaws.com/birdcastdata/nexrad/daily/{odimCode}/{yyyy}/{odimCode}_vpts_{yyyymmdd}.csv"
const availableHeights = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900,
  1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
  2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
  3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900,
  4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800
];

export default {
  availableLanguages: [
    { label: "English", code: "en" },
    { label: "Nederlands", code: "nl" },
    { label: "Français", code: "fr"}
  ] as Language[],
  initialLanguageCode: "en" as LangCode,
  radarLabelIncludesCode: true,
availableRadars: [
    {
      label: "Alabama",
      options: [
        { odimCode: "KBMX", text: "BIRMINGHAM", latitude: 33.172417, longitude: -86.770167, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KEOX", text: "FORT RUCKER", latitude: 31.460556, longitude: -85.459389, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KHTX", text: "HUNTSVILLE", latitude: 34.930556, longitude: -86.083611, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMOB", text: "MOBILE", latitude: 30.679444, longitude: -88.24, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMXX", text: "MAXWELL AFB", latitude: 32.53665, longitude: -85.78975, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Alaska",
      options: [
        { odimCode: "PABC", text: "BETHEL FAA", latitude: 60.791944, longitude: -161.87638, timezone: "America/Anchorage", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV", showOnMap: false },
        { odimCode: "PACG", text: "SITKA", latitude: 56.852778, longitude: -135.52916, timezone: "America/Anchorage", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" ,showOnMap: false },
        { odimCode: "PAEC", text: "NOME", latitude: 64.511389, longitude: -165.295, timezone: "America/Anchorage", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" ,showOnMap: false },
        { odimCode: "PAHG", text: "ANCHORAGE", latitude: 60.725914, longitude: -151.35146, timezone: "America/Anchorage", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV", showOnMap: false  },
        { odimCode: "PAIH", text: "MIDDLETON ISLAND", latitude: 59.460767, longitude: -146.30344, timezone: "America/Anchorage", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" ,showOnMap: false },
        { odimCode: "PAKC", text: "KING SALMON", latitude: 58.679444, longitude: -156.62944, timezone: "America/Anchorage", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV", showOnMap: false  },
        { odimCode: "PAPD", text: "FAIRBANKS", latitude: 65.035114, longitude: -147.50143, timezone: "America/Anchorage", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV", showOnMap: false  }
      ]
    },
    {
      label: "Arizona",
      options: [
        { odimCode: "KEMX", text: "TUCSON", latitude: 31.89365, longitude: -110.63025, timezone: "America/Phoenix", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KFSX", text: "FLAGSTAFF", latitude: 34.574333, longitude: -111.19844, timezone: "America/Phoenix", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KIWA", text: "PHOENIX", latitude: 33.289233, longitude: -111.66991, timezone: "America/Phoenix", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KYUX", text: "YUMA", latitude: 32.495281, longitude: -114.65671, timezone: "America/Phoenix", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TPHX", text: "PHOENIX", latitude: 33.421111, longitude: -112.16305, timezone: "America/Phoenix", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Arkansas",
      options: [
        { odimCode: "KLZK", text: "LITTLE ROCK", latitude: 34.8365, longitude: -92.262194, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KSRX", text: "FORT SMITH", latitude: 35.290417, longitude: -94.361889, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "California",
      options: [
        { odimCode: "KBBX", text: "BEALE AFB", latitude: 39.495639, longitude: -121.63161, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KBHX", text: "EUREKA", latitude: 40.498583, longitude: -124.29216, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KDAX", text: "SACRAMENTO", latitude: 38.501111, longitude: -121.67783, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KEYX", text: "EDWARDS", latitude: 35.09785, longitude: -117.56075, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KHNX", text: "SAN JOAQUIN VALLEY", latitude: 36.314181, longitude: -119.63213, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMUX", text: "SAN FRANCISCO", latitude: 37.155222, longitude: -121.89844, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KNKX", text: "SAN DIEGO", latitude: 32.919017, longitude: -117.0418, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KSOX", text: "SANTA ANA MOUNTAINS", latitude: 33.817733, longitude: -117.636, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KVBX", text: "VANDENBERG AFB", latitude: 34.83855, longitude: -120.39791, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KVTX", text: "LOS ANGELES", latitude: 34.412017, longitude: -119.17875, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Colorado",
      options: [
        { odimCode: "KFTG", text: "DENVER FRONT RANGE AP", latitude: 39.786639, longitude: -104.5458, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGJX", text: "GRAND JUNCTION", latitude: 39.062169, longitude: -108.21376, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KPUX", text: "PUEBLO", latitude: 38.45955, longitude: -104.18135, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TDEN", text: "DENVER", latitude: 39.728056, longitude: -104.52611, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Delaware",
      options: [
        { odimCode: "KDOX", text: "DOVER AFB", latitude: 38.825767, longitude: -75.440117, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Florida",
      options: [
        { odimCode: "KAMX", text: "MIAMI", latitude: 25.611083, longitude: -80.412667, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KBYX", text: "KEY WEST", latitude: 24.5975, longitude: -81.703167, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KEVX", text: "EGLIN AFB", latitude: 30.565033, longitude: -85.921667, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KJAX", text: "JACKSONVILLE", latitude: 30.484633, longitude: -81.7019, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMLB", text: "MELBOURNE", latitude: 28.113194, longitude: -80.654083, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KTBW", text: "TAMPA", latitude: 27.7055, longitude: -82.401778, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KTLH", text: "TALLAHASSEE", latitude: 30.397583, longitude: -84.328944, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TFLL", text: "FT LAUDERDALE", latitude: 26.143056, longitude: -80.343889, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMCO", text: "ORLANDO INTERNATIONAL", latitude: 28.343889, longitude: -81.326111, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMIA", text: "MIAMI", latitude: 25.758056, longitude: -80.491111, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TPBI", text: "WEST PALM BEACH", latitude: 26.688056, longitude: -80.273056, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TTPA", text: "TAMPA", latitude: 27.86, longitude: -82.518056, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Georgia",
      options: [
        { odimCode: "KFFC", text: "ATLANTA", latitude: 33.36355, longitude: -84.56595, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KJGX", text: "ROBINS AFB", latitude: 32.675683, longitude: -83.350833, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KVAX", text: "MOODY AFB", latitude: 30.890278, longitude: -83.001806, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TATL", text: "ATLANTA", latitude: 33.646944, longitude: -84.261944, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Hawaii",
      options: [
        { odimCode: "PHKI", text: "SOUTH KAUAI", latitude: 21.893889, longitude: -159.5525, timezone: "Pacific/Honolulu", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV",showOnMap: false  },
        { odimCode: "PHKM", text: "KAMUELA", latitude: 20.125278, longitude: -155.77777, timezone: "Pacific/Honolulu", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" ,showOnMap: false },
        { odimCode: "PHMO", text: "MOLOKAI", latitude: 21.132778, longitude: -157.18027, timezone: "Pacific/Honolulu", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" ,showOnMap: false },
        { odimCode: "PHWA", text: "SOUTH SHORE", latitude: 19.095, longitude: -155.56888, timezone: "Pacific/Honolulu", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV",showOnMap: false  }
      ]
    },
    {
      label: "Idaho",
      options: [
        { odimCode: "KCBX", text: "BOISE", latitude: 43.490217, longitude: -116.23603, timezone: "America/Boise", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KSFX", text: "POCATELLO", latitude: 43.1056, longitude: -112.68613, timezone: "America/Boise", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Illinois",
      options: [
        { odimCode: "KILX", text: "LINCOLN", latitude: 40.1505, longitude: -89.336792, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLOT", text: "CHICAGO", latitude: 41.604444, longitude: -88.084444, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMDW", text: "CHICAGO MIDWAY", latitude: 41.651111, longitude: -87.73, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TORD", text: "CHICAGO OHARE", latitude: 41.796944, longitude: -87.858056, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Indiana",
      options: [
        { odimCode: "KIND", text: "INDIANAPOLIS", latitude: 39.7075, longitude: -86.280278, timezone: "America/Indiana/Indianapolis", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KIWX", text: "FORT WAYNE", latitude: 41.358611, longitude: -85.7, timezone: "America/Indiana/Indianapolis", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KVWX", text: "EVANSVILLE", latitude: 38.26025, longitude: -87.724528, timezone: "America/Indiana/Indianapolis", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TIDS", text: "INDIANAPOLIS", latitude: 39.636944, longitude: -86.436111, timezone: "America/Indiana/Indianapolis", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Iowa",
      options: [
        { odimCode: "KDMX", text: "DES MOINES", latitude: 41.7312, longitude: -93.722869, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KDVN", text: "DAVENPORT", latitude: 41.611667, longitude: -90.580833, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Kansas",
      options: [
        { odimCode: "KDDC", text: "DODGE CITY", latitude: 37.760833, longitude: -99.968889, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGLD", text: "GOODLAND", latitude: 39.366944, longitude: -101.70027, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KICT", text: "WICHITA", latitude: 37.654444, longitude: -97.443056, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KTWX", text: "TOPEKA", latitude: 38.99695, longitude: -96.23255, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TICH", text: "WICHITA", latitude: 37.506944, longitude: -97.436944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Kentucky",
      options: [
        { odimCode: "KHPX", text: "FORT CAMPBELL", latitude: 36.736972, longitude: -87.285583, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KJKL", text: "JACKSON", latitude: 37.590833, longitude: -83.313056, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLVX", text: "LOUISVILLE", latitude: 37.975278, longitude: -85.943889, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KPAH", text: "PADUCAH", latitude: 37.068333, longitude: -88.771944, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TCVG", text: "COVINGTON", latitude: 38.898056, longitude: -84.58, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TSDF", text: "LOUISVILLE", latitude: 38.046111, longitude: -85.61, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Louisiana",
      options: [
        { odimCode: "KHDC", text: "HAMMOND MUNICIPAL AIRPORT", latitude: 30.5193, longitude: -90.4074, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLCH", text: "LAKE CHARLES", latitude: 30.125306, longitude: -93.215889, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLIX", text: "NEW ORLEANS", latitude: 30.336667, longitude: -89.825417, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KPOE", text: "FORT POLK", latitude: 31.155278, longitude: -92.976111, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KSHV", text: "SHREVEPORT", latitude: 32.450833, longitude: -93.84125, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMSY", text: "NEW ORLEANS", latitude: 30.021944, longitude: -90.403056, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Maine",
      options: [
        { odimCode: "KCBW", text: "HOULTON", latitude: 46.03925, longitude: -67.806431, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGYX", text: "PORTLAND", latitude: 43.891306, longitude: -70.256361, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Maryland",
      options: [
        { odimCode: "TADW", text: "ANDREWS AFB", latitude: 38.695, longitude: -76.845, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TBWI", text: "BALTIMORE WASHINGTON", latitude: 39.09, longitude: -76.63, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TDCA", text: "WASHINGTON NATIONAL", latitude: 38.758889, longitude: -76.961944, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Massachusetts",
      options: [
        { odimCode: "KBOX", text: "BOSTON", latitude: 41.955778, longitude: -71.136861, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TBOS", text: "BOSTON", latitude: 42.158056, longitude: -70.933056, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Michigan",
      options: [
        { odimCode: "KAPX", text: "GAYLORD", latitude: 44.90635, longitude: -84.719533, timezone: "America/Detroit", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KDTX", text: "DETROIT", latitude: 42.7, longitude: -83.471667, timezone: "America/Detroit", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGRR", text: "GRAND RAPIDS", latitude: 42.893889, longitude: -85.544889, timezone: "America/Detroit", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMQT", text: "MARQUETTE", latitude: 46.531111, longitude: -87.548333, timezone: "America/Detroit", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TDTW", text: "DETROIT", latitude: 42.111111, longitude: -83.515, timezone: "America/Detroit", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Minnesota",
      options: [
        { odimCode: "KDLH", text: "DULUTH", latitude: 46.836944, longitude: -92.209722, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMPX", text: "MINNEAPOLIS", latitude: 44.848889, longitude: -93.565528, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMSP", text: "MINNEAPOLIS", latitude: 44.871111, longitude: -92.933056, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Mississippi",
      options: [
        { odimCode: "KDGX", text: "JACKSON BRANDON", latitude: 32.279944, longitude: -89.984444, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGWX", text: "COLUMBUS AFB", latitude: 33.896917, longitude: -88.329194, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMEM", text: "MEMPHIS", latitude: 34.896111, longitude: -89.993056, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Missouri",
      options: [
        { odimCode: "KEAX", text: "KANSAS CITY", latitude: 38.81025, longitude: -94.264472, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLSX", text: "ST LOUIS", latitude: 38.698611, longitude: -90.682778, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KSGF", text: "SPRINGFIELD", latitude: 37.235239, longitude: -93.400419, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMCI", text: "KANSAS CITY", latitude: 39.498056, longitude: -94.741944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TSTL", text: "ST LOUIS", latitude: 38.805, longitude: -90.488889, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Montana",
      options: [
        { odimCode: "KBLX", text: "BILLINGS", latitude: 45.853778, longitude: -108.6068, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGGW", text: "GLASGOW", latitude: 48.206361, longitude: -106.62469, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMSX", text: "MISSOULA", latitude: 47.041, longitude: -113.98622, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KTFX", text: "GREAT FALLS", latitude: 47.459583, longitude: -111.38533, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Nebraska",
      options: [
        { odimCode: "KLNX", text: "NORTH PLATTE", latitude: 41.957944, longitude: -100.57622, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KOAX", text: "OMAHA", latitude: 41.320369, longitude: -96.366819, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KUEX", text: "HASTINGS", latitude: 40.320833, longitude: -98.441944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Nevada",
      options: [
        { odimCode: "KESX", text: "LAS VEGAS", latitude: 35.70135, longitude: -114.89165, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLRX", text: "ELKO", latitude: 40.73955, longitude: -116.8027, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KRGX", text: "RENO", latitude: 39.754056, longitude: -119.46202, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TLAS", text: "LAS VEGAS", latitude: 36.143889, longitude: -115.00694, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "New Jersey",
      options: [
        { odimCode: "KDIX", text: "PHILADELPHIA", latitude: 39.947089, longitude: -74.410731, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TEWR", text: "NEWARK", latitude: 40.593056, longitude: -74.27, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TPHL", text: "PHILADELPHIA", latitude: 39.948889, longitude: -75.068889, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "New Mexico",
      options: [
        { odimCode: "KABX", text: "ALBUQUERQUE", latitude: 35.149722, longitude: -106.82388, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KEPZ", text: "EL PASO", latitude: 31.873056, longitude: -106.698, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KFDX", text: "CANNON AFB", latitude: 34.634167, longitude: -103.61888, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KHDX", text: "HOLLOMAN AFB", latitude: 33.077, longitude: -106.12003, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "New York",
      options: [
        { odimCode: "KBGM", text: "BINGHAMTON", latitude: 42.199694, longitude: -75.984722, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KBUF", text: "BUFFALO", latitude: 42.948789, longitude: -78.736781, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KENX", text: "ALBANY", latitude: 42.586556, longitude: -74.064083, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KOKX", text: "NEW YORK CITY", latitude: 40.865528, longitude: -72.863917, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KTYX", text: "FORT DRUM", latitude: 43.755694, longitude: -75.679861, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TJFK", text: "NEW YORK CITY JFK", latitude: 40.588889, longitude: -73.881111, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "North Carolina",
      options: [
        { odimCode: "KLTX", text: "WILMINGTON", latitude: 33.98915, longitude: -78.429108, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMHX", text: "MOREHEAD CITY", latitude: 34.775908, longitude: -76.876189, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KRAX", text: "RALEIGH DURHAM", latitude: 35.665519, longitude: -78.48975, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TCLT", text: "CHARLOTTE", latitude: 35.336944, longitude: -80.885, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TRDU", text: "RALEIGH", latitude: 36.001944, longitude: -78.696944, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "North Dakota",
      options: [
        { odimCode: "KBIS", text: "BISMARCK", latitude: 46.770833, longitude: -100.76055, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMBX", text: "MINOT AFB", latitude: 48.393056, longitude: -100.86444, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMVX", text: "GRAND FORKS", latitude: 47.527778, longitude: -97.325556, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Ohio",
      options: [
        { odimCode: "KCLE", text: "CLEVELAND", latitude: 41.413217, longitude: -81.859867, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KILN", text: "CINCINNATI", latitude: 39.420483, longitude: -83.82145, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TCMH", text: "COLUMBUS", latitude: 40.006111, longitude: -82.715, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TDAY", text: "DAYTON", latitude: 40.021944, longitude: -84.123056, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TLVE", text: "CLEVELAND", latitude: 41.29, longitude: -82.008056, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Oklahoma",
      options: [
        { odimCode: "KCRI", text: "ROC FAA REDUNDANT RDA 1", latitude: 35.238333, longitude: -97.46, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KFDR", text: "ALTUS AFB", latitude: 34.362194, longitude: -98.976667, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KINX", text: "TULSA", latitude: 36.175131, longitude: -95.564161, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KOUN", text: "NORMAN NSSL", latitude: 35.236058, longitude: -97.46235, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KTLX", text: "OKLAHOMA CITY", latitude: 35.333361, longitude: -97.277761, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KVNX", text: "VANCE AFB", latitude: 36.740617, longitude: -98.127717, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TOKC", text: "NORMAN WFO", latitude: 35.276111, longitude: -97.51, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TTUL", text: "TULSA", latitude: 36.071111, longitude: -95.826944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Oregon",
      options: [
        { odimCode: "KMAX", text: "MEDFORD", latitude: 42.081169, longitude: -122.71736, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KPDT", text: "PENDLETON", latitude: 45.69065, longitude: -118.85293, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KRTX", text: "PORTLAND", latitude: 45.715039, longitude: -122.965, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Overseas Territories",
      options: [
        { odimCode: "LPLA", text: "LAJES AB", latitude: 38.73028, longitude: -27.32167, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV",showOnMap: false},
        { odimCode: "PGUA", text: "ANDERSEN AFB AGANA", latitude: 13.455833, longitude: 144.811111, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV",showOnMap: false },
        { odimCode: "RKJK", text: "KUNSAN", latitude: 35.924167, longitude: 126.622222, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV",showOnMap: false },
        { odimCode: "RKSG", text: "CAMP HUMPHREYS", latitude: 37.207569, longitude: 127.285561, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV",showOnMap: false },
        { odimCode: "RODN", text: "KADENA", latitude: 26.3078, longitude: 127.903469, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV",showOnMap: false }
      ]
    },
    {
      label: "Pennsylvania",
      options: [
        { odimCode: "KCCX", text: "STATE COLLEGE", latitude: 40.923167, longitude: -78.003722, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KPBZ", text: "PITTSBURGH", latitude: 40.531717, longitude: -80.217967, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TPIT", text: "PITTSBURGH", latitude: 40.501111, longitude: -80.486111, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Puerto Rico",
      options: [
        { odimCode: "TJBQ", text: "RAFAEL HERNANDEZ AIRPORT", latitude: 18.485, longitude: -67.143, timezone: "America/Puerto_Rico", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TJRV", text: "JOSE APONTE DE LA TORRE AI", latitude: 18.256, longitude: -65.637, timezone: "America/Puerto_Rico", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TJUA", text: "SAN JUAN", latitude: 18.115667, longitude: -66.078167, timezone: "America/Puerto_Rico", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TSJU", text: "SAN JUAN", latitude: 18.473889, longitude: -66.178889, timezone: "America/Puerto_Rico", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "South Carolina",
      options: [
        { odimCode: "KCAE", text: "COLUMBIA", latitude: 33.948722, longitude: -81.118278, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KCLX", text: "CHARLESTON", latitude: 32.655528, longitude: -81.042194, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGSP", text: "GREER", latitude: 34.883306, longitude: -82.219833, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "South Dakota",
      options: [
        { odimCode: "KABR", text: "ABERDEEN", latitude: 45.455833, longitude: -98.413333, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KFSD", text: "SIOUX FALLS", latitude: 43.587778, longitude: -96.729444, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KUDX", text: "RAPID CITY", latitude: 44.124722, longitude: -102.83, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Tennessee",
      options: [
        { odimCode: "KMRX", text: "KNOXVILLE", latitude: 36.168611, longitude: -83.401944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KNQA", text: "MEMPHIS", latitude: 35.344722, longitude: -89.873333, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KOHX", text: "NASHVILLE", latitude: 36.247222, longitude: -86.5625, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TBNA", text: "NASHVILLE", latitude: 35.98, longitude: -86.661944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Texas",
      options: [
        { odimCode: "KAMA", text: "AMARILLO", latitude: 35.233333, longitude: -101.70927, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KBRO", text: "BROWNSVILLE", latitude: 25.916, longitude: -97.418967, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KCRP", text: "CORPUS CHRISTI", latitude: 27.784017, longitude: -97.51125, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KDFX", text: "LAUGHLIN AFB", latitude: 29.273139, longitude: -100.28033, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KDYX", text: "DYESS AFB", latitude: 32.5385, longitude: -99.254333, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KEWX", text: "AUSTIN SAN ANTONIO", latitude: 29.704056, longitude: -98.028611, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KFWS", text: "DALLAS", latitude: 32.573, longitude: -97.30315, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGRK", text: "FORT HOOD", latitude: 30.721833, longitude: -97.382944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KHGX", text: "HOUSTON", latitude: 29.4719, longitude: -95.078733, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLBB", text: "LUBBOCK", latitude: 33.654139, longitude: -101.81416, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMAF", text: "MIDLAND ODESSA", latitude: 31.943461, longitude: -102.18925, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KSJT", text: "SAN ANGELO", latitude: 31.371278, longitude: -100.4925, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TDAL", text: "DALLAS LOVE FIELD", latitude: 32.926111, longitude: -96.968056, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TDFW", text: "DALLAS FT WORTH", latitude: 33.065, longitude: -96.918056, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "THOU", text: "HOUSTON HOBBY", latitude: 29.516111, longitude: -95.241944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TIAH", text: "HOUSTON INTERNATIONAL", latitude: 30.065, longitude: -95.566944, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Utah",
      options: [
        { odimCode: "KICX", text: "CEDAR CITY", latitude: 37.59105, longitude: -112.86218, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMTX", text: "SALT LAKE CITY", latitude: 41.262778, longitude: -112.44777, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TSLC", text: "SALT LAKE CITY", latitude: 40.966944, longitude: -111.93, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Vermont",
      options: [
        { odimCode: "KCXX", text: "BURLINGTON", latitude: 44.511, longitude: -73.166431, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Virginia",
      options: [
        { odimCode: "KAKQ", text: "NORFOLK RICH", latitude: 36.98405, longitude: -77.007361, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KFCX", text: "ROANOKE", latitude: 37.0244, longitude: -80.273969, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLWX", text: "STERLING", latitude: 38.976111, longitude: -77.4875, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TIAD", text: "WASHINGTON DULLES", latitude: 39.083889, longitude: -77.528889, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Washington",
      options: [
        { odimCode: "KATX", text: "SEATTLE", latitude: 48.194611, longitude: -122.49569, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KLGX", text: "LANGLEY HILL NW WASHINGTON", latitude: 47.116944, longitude: -124.10666, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KOTX", text: "SPOKANE", latitude: 47.680417, longitude: -117.62677, timezone: "America/Los_Angeles", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "West Virginia",
      options: [
        { odimCode: "KRLX", text: "CHARLESTON", latitude: 38.311111, longitude: -81.722778, timezone: "America/New_York", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Wisconsin",
      options: [
        { odimCode: "KARX", text: "LA CROSSE", latitude: 43.822778, longitude: -91.191111, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KGRB", text: "GREEN BAY", latitude: 44.498633, longitude: -88.111111, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KMKX", text: "MILWAUKEE", latitude: 42.9679, longitude: -88.550667, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "TMKE", text: "MILWAUKEE", latitude: 42.818889, longitude: -88.046111, timezone: "America/Chicago", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    },
    {
      label: "Wyoming",
      options: [
        { odimCode: "KCYS", text: "CHEYENNE", latitude: 41.151919, longitude: -104.80603, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" },
        { odimCode: "KRIW", text: "RIVERTON", latitude: 43.066089, longitude: -108.4773, timezone: "America/Denver", endpoint: aloftNexradUrl, heights: availableHeights, vptsFileFormat: "CSV" }
      ]
    }
] as GroupedRadarInterface[],

  initialRadarCode: "KCYS",

  availableTimeIntervals: [
    { stringId: "1d", value: 24 },
    { stringId: "3d", value: 72 },
    //{ text: "1h", value: 1 } // Only for debugging: intervals that are not multiple of 24h won't work properly with the time navigation logic
  ] as TimeInterval[],

  initialTimeInterval: 24,
  initialDate: moment().subtract(2, "days").format(moment.HTML5_FMT.DATE),

  initialTimeDisplay: "radarLocal" as TimeDisplayedAsValue,

  appTemporalResolution: 15 * 60, // seconds (this is the resolution we use for calculation and display) Should be a multiple of the data (vpts file) temporal resolution for downsampling, or equal if we want to show data at the highest resolution

  VPChartStyle: {
    margin: { top: 20, right: globalChartMarginRight, bottom: 30, left: globalChartMarginLeft },
    width: svgWidth,
    height: 300,

    showTooltip: false, // BEWARE: useful for debugging, but performance is horrible

    noDataColor: "#C0C0C0",

    // The BirdTAM color scale: code + associated color
    birdtamColors: new Map([
      [0, "#ffffff"],
      [1, "#e5ffe5"],
      [2, "#ccffcc"],
      [3, "#b2ffb2"],
      [4, "#99ff99"],
      [5, "#00ff00"],
      [6, "#ffff00"],
      [7, "#ffb2b2"],
      [8, "#ff0000"],
      [9, "#333333"],
    ]),

    axisTimeFormat: "HH:mm z",
    tooltipTimeFormat: "MMM D - HH:mm z",

    initialColorScheme: "viridis" as ColorSchemeIdentifier,
  },
  VPIChartStyle: {
    margin: { top: 15, right: globalChartMarginRight, bottom: 30, left: globalChartMarginLeft },
    width: svgWidth,
    height: 300,

    axisTimeFormat: "HH:mm z",
    tooltipTimeFormat: "MMM D - HH:mm z",

    strokeColor: "#007bff", // Bootstrap link colour
    fillColor: "#cfe2ff", // Bootstrap primary background colour
    strokeWidth: 1,

    showTooltip: true,
    initialMode: "mtr" as IntegratedPropertyName
  },

  TimelineChartStyle: {
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    width: svgWidth - globalChartMarginLeft - globalChartMarginRight, // This chart is embedded into the main charts, and should be as long as the X axis
    height: 10,

    tooltipTimeFormat: "MMM D - HH:mm z",

    showTooltip: true,
  }
}
