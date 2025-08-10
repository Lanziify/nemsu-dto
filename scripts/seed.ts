import "dotenv/config";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { seedDefaultAdmin } from "./seeder/admin";
import { seedDefaultPositions } from "./seeder/position";
import { seedDefaultOffices } from "./seeder/office";
import { seedDefaultBranches } from "./seeder/branches";
import { seedTestUsers } from "./seeder/test-users";

// [STATUS] | TASK: Description
// [ ] - Idle
// [-] - Ongoing
// [/] - Completed

const seederConfig: SeederConfig = {
  admin: {
    cb: seedDefaultAdmin,
    args: [] as const,
  },
  positions: {
    cb: seedDefaultPositions,
    args: [] as const,
  },
  offices: {
    cb: seedDefaultOffices,
    args: [] as const,
  },
  branches: {
    cb: seedDefaultBranches,
    args: [] as const,
  },
  users: {
    cb: seedTestUsers,
    args: ["n"] as const,
  },
} as const;

type SeederKey = "admin" | "positions" | "offices" | "branches" | "users";

type SeederConfig = {
  [K in SeederKey]: SeederConfigItemValue;
};

interface SeederConfigItemValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (...args: any[]) => Promise<void>;
  args: string[];
}

type SeederFlags = {
  [K in SeederKey]: boolean;
};

function getSeeders(argv: SeederFlags) {
  const hasFlagSet = Object.keys(seederConfig)
    .map((key) => argv[key as keyof SeederFlags])
    .some(Boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seeders: { args: any[]; seeder: (...args: any[]) => Promise<void> }[] =
    [];

  Object.keys(seederConfig).forEach((flag) => {
    if (hasFlagSet) {
      if (!argv[flag as keyof SeederConfig]) return;
    } else {
      if (flag === "users") return;
    }

    const config = seederConfig[flag as keyof SeederConfig];
    if (!config) return;

    // Collect arguments for this seeder
    const args = config.args.map(
      (argName) => argv[argName as keyof SeederConfig],
    );
    seeders.push({ args, seeder: config.cb });
  });

  return seeders;
}

(async function run() {
  if (process.env.ALLOW_SEED != "true") {
    console.error("Seeding currrently not allowed.");
    return;
  }

  const options = Object.keys(seederConfig).reduce(
    (acc, key) => {
      acc[key as SeederKey] = { type: "boolean", default: false };
      return acc;
    },
    {} as Record<SeederKey, { type: "boolean"; default: boolean }>,
  );

  const argv = await yargs(hideBin(process.argv))
    .options(options)
    .check((argv) => {
      Object.keys(argv).forEach((flag) => {
        const config = seederConfig[flag as keyof SeederFlags];

        if (!config) return;

        config.args.forEach((f) => {
          if (argv[f] && !argv[flag]) {
            console.error(`--${f} can only be used with --${flag}`);
            process.exit(1);
          }
        });
      });

      return true;
    })
    .parse();

  const results = await Promise.allSettled(
    getSeeders(argv).map(({ args, seeder }) =>
      args.length > 0 ? seeder(...args) : seeder(),
    ),
  );

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`Seeding completed successfully!`);
      process.exit(0)
    }
    if (result.status === "rejected") {
      console.error(result.reason instanceof Error && result.reason.message);
      process.exit(1);
    }
  });
})();
