import { exec } from 'child_process';

export default function handler(req, res) {
  exec('cd ./pages/api/ && python3 ./send_message.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).json({ message: stdout });
  });

  exec('cd ../../', (error, stdout, stderr) => {
    console.log('Directory changed back to frontend/')
  })
}