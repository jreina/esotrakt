#!/usr/bin/env node

import program from "commander";
import switchCase from "./utils/switchCase";
import LogManager from "./managers/LogManager";
import GistInfoManager from "./managers/GistInfoManager";
const { version } = require("../package.json");
import formatTable from "./utils/format-table";

program
  .name("esotrakt")
  .version(version)
  .option("-a, --append <data>", "append an entry")
  .option("-v, --view", "view all entries")
  .option("-f, --filter <t>", "filter entries by t")
  .option("-s, --set-gist <id>", "set the Gist ID to use on this computer")
  .option("-d, --delete <id>", "delete an entry")
  .parse(process.argv);

switchCase(
  {
    append: (data: string) => {
      const mgr = new LogManager();
      return mgr.addLogEntry(data);
    },
    delete: (id: string) => {
      console.log(`Dropping log entry ${id}`);
      const mgr = new LogManager();
      return mgr.dropLogEntry(id);
    },
    filter: async (t: string) => {
      const mgr = new LogManager();
      const items = await mgr.listLogEntries();
      const ofT = items.filter(item => item.split('::')[2] === t)
      const table = formatTable(ofT);
      console.log(table);
    },
    setGist: id => {
      const mgr = new GistInfoManager();
      return mgr.save(id);
    },
    view: async () => {
      const mgr = new LogManager();
      const items = await mgr.listLogEntries();
      const table = formatTable(items);
      console.log(table);
    }
  },
  program,
  program.outputHelp.bind(program)
);