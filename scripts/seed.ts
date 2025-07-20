import "dotenv/config";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { seedDefaultAdmin } from "./seeder/admin";
import { seedDefaultPositions } from "./seeder/position";
import { seedDefaultOffices } from "./seeder/office";
import { seedDefaultBranches } from "./seeder/branches";

const seeders = {
	admin: seedDefaultAdmin,
	position: seedDefaultPositions,
	office: seedDefaultOffices,
	branch: seedDefaultBranches,
};

type SeederKey = keyof typeof seeders;

function getSeeders(flags: SeederKey[]): Array<() => Promise<void>> {
	return flags.map((flag) => seeders[flag]);
}

(async function run() {
	if (process.env.ALLOW_SEED != "true") {
		console.error("Seeding currrently not allowed.");
		return;
	}

	const options = Object.keys(seeders).reduce((acc, key) => {
		acc[key as SeederKey] = { type: "boolean", default: false };
		return acc;
	}, {} as Record<SeederKey, { type: "boolean"; default: boolean }>);

	const argv = await yargs(hideBin(process.argv)).options(options).parse();

	const rawFlags = Object.keys(argv).filter((flag) => argv[flag] === true);
	const flags: SeederKey[] =
		rawFlags.length > 0
			? (rawFlags as SeederKey[])
			: (Object.keys(seeders) as SeederKey[]);

	const results = await Promise.allSettled(
		getSeeders(flags).map((seeder) => seeder())
	);

	results.forEach((result, i) => {
		if(result.status === "fulfilled") {
			console.log(`Seeding ${flags[i]} completed successfully!`)
		}
		if (result.status === "rejected") {
			console.error(
				result.reason instanceof Error && result.reason.message
			);
		}
	});
})();
