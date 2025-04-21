import * as fs from "fs";
import * as path from "path";
import { loadSchema } from "@/lib/semantic/schema/loadSchema";

// Define schemaRules with example rules (replace with actual implementation or import)
// TODO: This is a mess
const schemaRules: { [key: string]: (folderPath: string) => string } = {
  path: (folderPath: string) => folderPath,
  schemaVersion: (schemaVersion: string) => schemaVersion,
};

const syncFoldersToOntology = async () => {
  function getAllFolders(dir: string, baseDir: string): string[] {
    let folders: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      if (item === "node_modules" || item === ".git") {
        continue;
      }

      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        folders.push(path.relative(baseDir, fullPath)); // Add relative path
        folders = folders.concat(getAllFolders(fullPath, baseDir)); // Recursively add subfolders
      }
    }

    return folders;
  }
  try {
    // Load the folder schema
    const folderSchema = (await loadSchema("folder")) as {
      fields: { name: string }[];
      version: string;
    };
    console.log("Folder Schema:", folderSchema);

    // Define the project root directory
    const projectRoot = path.resolve(__dirname, "..");

    // Get all folders
    const folders = getAllFolders(projectRoot, projectRoot);

    // Map folders to schema format
    const folderEntities = folders.map((folderPath) => {
      const entity: { [key: string]: string | undefined } = {};
      for (const field of folderSchema.fields) {
        if (field.name === "path") {
          entity[field.name] = schemaRules[field.name](folderPath);
        } else if (field.name === "schemaVersion") {
          entity[field.name] = schemaRules[field.name](folderSchema.version); // Example version
        } else {
          entity[field.name] = undefined; // Set undefined if no rule exists
        }
      }
      return entity;
    });

    console.log("Folder Entities:", folderEntities);

    // Define the output file path
    const outputFilePath = path.join(
      projectRoot,
      "data/entities/folder/folder.local.json"
    );

    // Ensure the directory exists
    const outputDir = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the folder entities to the JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(folderEntities, null, 2));
    console.log(`Folder data written to ${outputFilePath}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

syncFoldersToOntology();
