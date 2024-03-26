"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectionsDePopulation2019_2024 = void 0;
const fs = __importStar(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const pl = __importStar(require("nodejs-polars"));
class ProjectionsDePopulation2019_2024 {
    constructor(remoteFile) {
        this.remoteFile = "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/proj_19np?format=TSV";
        this.localRawFile = "./rawData/proj_19np.csv";
        this.transformedFile = "./transformedData/proj_19np_transformed.csv";
        if (remoteFile)
            this.localRawFile = remoteFile;
    }
    downLoad(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path)
                path = this.localRawFile;
            const res = yield (0, node_fetch_1.default)(this.remoteFile);
            const fileStream = fs.createWriteStream(path);
            yield new Promise((resolve, reject) => {
                var _a, _b;
                (_a = res.body) === null || _a === void 0 ? void 0 : _a.pipe(fileStream);
                (_b = res.body) === null || _b === void 0 ? void 0 : _b.on("error", reject);
                fileStream.on("finish", resolve);
            });
            this.localRawFile = path;
        });
    }
    transform(destFile) {
        if (!destFile)
            destFile = this.transformedFile;
        const data = fs.readFileSync('./data/proj_19np.tsv', { encoding: 'utf8' });
        let df = pl.readCSV(data, { sep: ",", tryParseDates: true }).sample(1000);
        df = df.rename({ "TIME_PERIOD": "time" }).rename({ "OBS_FLAG": "population_proj" });
        df = df.select('time', 'DATAFLOW', 'LAST UPDATE', 'freq', 'unit', 'population_proj', 'sex', 'projection', 'age');
        df = df.filter((pl.col("projection").str.contains("BSL"))
            .and(pl.col("sex").str.contains(/M|F/))).withColumn(
        //pl.col("time").str.Datetime().alias("newdate"),
        //pl.col("time").str.strptime(pl.Dtypes[pl.Datetime]).alias("newdate"),
        //pl.col("time").str.replace(pl.col("time"), new Date(pl.col("time")))
        pl.col('age').str.replace('Y_GE100', 'Y_OPEN'));
        df.writeCSV(destFile);
    }
    config(options) {
        if (options)
            console.log("configuration");
    }
}
exports.ProjectionsDePopulation2019_2024 = ProjectionsDePopulation2019_2024;
//# sourceMappingURL=ProjectionsDePopulation2019_2024.js.map