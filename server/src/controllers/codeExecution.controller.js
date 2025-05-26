import { exec } from "child_process";
import { stdout } from "process";
import { v4 as uuid } from "uuid";
import fs from "fs";

export const codeExecution = async (req, res) => {
  const { code, language } = req.body;

  const filename = `${uuid()}.${
    language === "cpp"
      ? "cpp"
      : language === "javascript"
      ? "js"
      : language === "python"
      ? "py"
      : language
  }`;
  //bruh relative to cwd=>current working directory root

  const tmpDir = "./tmp";

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
  const filepath = `./tmp/${filename}`;

  fs.writeFileSync(filepath, code);
  let cmd = "";
  if (language === "cpp") {
    const exePath = `tmp/${filename}.exe`;
    cmd = `g++ ${filepath} -o ${exePath} && ${exePath.replace(/\//g, "\\")}`;
  } else if (language === "python") {
    cmd = `python3 ${filepath}`;
  } else if (language === "javascript") {
    cmd = `node ${filepath}`;
  } else {
    return res.json({
      output: "Invalid language dude!",
    });
  }

  //exec lets us write shell command within node js

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return res.json({
        output: stderr,
      });
    }

    console.log({ output: stdout });
    return res.json({ output: stdout });
  });
};
