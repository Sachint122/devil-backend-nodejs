const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

// ─── Parse CLI Arguments ──────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    projectName: null,
    docker: false,
    cloudinary: false,
    emailProvider: null,
    paymentProvider: null,
    noInstall: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--docker') options.docker = true;
    else if (arg === '--cloudinary') options.cloudinary = true;
    else if (arg === '--email-gmail') options.emailProvider = 'gmail';
    else if (arg === '--email-brevo') options.emailProvider = 'brevo';
    else if (arg === '--razorpay') options.paymentProvider = 'razorpay';
    else if (arg === '--stripe') options.paymentProvider = 'stripe';
    else if (arg === '--no-install') options.noInstall = true;
    else if (!arg.startsWith('--')) options.projectName = arg;
  }

  return options;
}

// ─── Show Help ────────────────────────────────────────────
function showHelp() {
  console.log(`
😈 devil-backend-nodejs — Node.js Backend Scaffold CLI

USAGE:
  npx devil-backend-nodejs <project-name> [options]

OPTIONS:
  --cloudinary         Add Cloudinary file upload
  --email-gmail        Add Gmail SMTP email
  --email-brevo        Add Brevo email
  --razorpay           Add Razorpay payment
  --stripe             Add Stripe payment
  --docker             Add Docker support
  --no-install         Skip npm install
  --help, -h           Show help

EXAMPLES:
  npx devil-backend-nodejs my-app
  npx devil-backend-nodejs my-app --cloudinary
  npx devil-backend-nodejs my-app --email-brevo --razorpay
  npx devil-backend-nodejs my-app --cloudinary --email-gmail --razorpay --docker
`);
}

// ─── Main ─────────────────────────────────────────────────
async function main() {
  const cliOptions = parseArgs();

  if (cliOptions.help) {
    showHelp();
    process.exit(0);
  }

  console.log('\n😈 Welcome to devil-backend-nodejs!\n');

  // ── Project Name ──
  let projectName = cliOptions.projectName;
  if (!projectName) {
    const answer = await inquirer.prompt([{
      type: 'input',
      name: 'projectName',
      message: '📁 Project name:',
      default: 'my-devil-app',
      validate: (input) => input.trim() !== '' || 'Project name cannot be empty!'
    }]);
    projectName = answer.projectName;
  }

  // ── Interactive mode agar koi flag nahi ──
  let answers = {
    cloudinary: cliOptions.cloudinary,
    emailProvider: cliOptions.emailProvider,
    paymentProvider: cliOptions.paymentProvider,
    docker: cliOptions.docker,
  };

  const hasFlags = cliOptions.cloudinary || cliOptions.emailProvider ||
    cliOptions.paymentProvider || cliOptions.docker;

  if (!hasFlags) {
    answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'cloudinary',
        message: '📁 Add Cloudinary file upload?',
        default: false,
      },
      {
        type: 'list',
        name: 'emailProvider',
        message: '📧 Choose email provider:',
        choices: [
          { name: 'None', value: null },
          { name: 'Gmail (SMTP)', value: 'gmail' },
          { name: 'Brevo', value: 'brevo' },
        ],
      },
      {
        type: 'list',
        name: 'paymentProvider',
        message: '💳 Choose payment gateway:',
        choices: [
          { name: 'None', value: null },
          { name: 'Razorpay', value: 'razorpay' },
          { name: 'Stripe', value: 'stripe' },
        ],
      },
      {
        type: 'confirm',
        name: 'docker',
        message: '🐳 Add Docker support?',
        default: false,
      },
    ]);
  }

  const targetDir = path.join(process.cwd(), projectName);

  // ── Check folder exists ──
  if (fs.existsSync(targetDir)) {
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: `⚠️  Folder "${projectName}" already exists. Overwrite?`,
      default: false,
    }]);
    if (!overwrite) {
      console.log('❌ Cancelled.');
      process.exit(0);
    }
  }

  console.log(`\n==================================================`);
  console.log(`📁 Creating project: ${projectName}`);
  console.log(`==================================================`);

  // ── Copy basic template ──
  const templatePath = path.join(TEMPLATES_DIR, 'basic');
  console.log('📋 Copying template files...');
  copyDir(templatePath, targetDir);
  console.log('✅ Template files copied!');

  // ── Docker files ──
  if (answers.docker) {
    const dockerSrc = path.join(TEMPLATES_DIR, 'docker');
    if (fs.existsSync(dockerSrc)) {
      fs.copyFileSync(path.join(dockerSrc, 'Dockerfile'), path.join(targetDir, 'Dockerfile'));
      fs.copyFileSync(path.join(dockerSrc, 'docker-compose.yml'), path.join(targetDir, 'docker-compose.yml'));
      console.log('✅ Docker support added!');
    }
  }

  // ── Generate package.json ──
  console.log('📦 Generating package.json...');
  generatePackageJson(targetDir, projectName, answers);
  console.log('✅ package.json created!');

  // ── Generate .env ──
  console.log('🔑 Creating .env file...');
  generateEnv(targetDir, projectName, answers);
  console.log('✅ .env file created!');

  // ── Install dependencies ──
  if (!cliOptions.noInstall) {
    console.log('\n📦 Installing dependencies...');
    console.log('⏳ This may take a minute...\n');
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
    console.log(`\n==================================================`);
    console.log(`✅ All dependencies installed!`);
    console.log(`==================================================`);
  }

  console.log(`\n🎉 Project "${projectName}" created successfully!\n`);
  console.log(`👉 Next steps:`);
  console.log(`   cd ${projectName}`);
  console.log(`   Update your .env file with your values`);
  console.log(`   npm run dev\n`);
  console.log(`😈 Happy coding with devil-backend-nodejs!`);
  console.log(`==================================================\n`);
}

// ─── Helper: Copy Directory ───────────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

// ─── Helper: Generate package.json ───────────────────────
function generatePackageJson(targetDir, projectName, answers) {
  const deps = {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "dotenv": "^16.3.1",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "cookie-parser": "^1.4.6",
    "compression": "^1.7.4",
    "hpp": "^0.2.3",
    "morgan": "^1.10.0",
    "devil-backend-nodejs": "latest"
  };

  if (answers.cloudinary) {
    deps["cloudinary"] = "^1.41.0";
    deps["multer"] = "^1.4.5-lts.1";
  }
  if (answers.emailProvider === 'gmail') {
    deps["nodemailer"] = "^6.9.7";
  }
  if (answers.emailProvider === 'brevo') {
    deps["sib-api-v3-sdk"] = "^8.5.0";
  }
  if (answers.paymentProvider === 'razorpay') {
    deps["razorpay"] = "^2.9.2";
  }
  if (answers.paymentProvider === 'stripe') {
    deps["stripe"] = "^14.0.0";
  }

  const pkg = {
    name: projectName,
    version: "1.0.0",
    description: `${projectName} - Generated by devil-backend-nodejs`,
    main: "server.js",
    scripts: {
      start: "node server.js",
      dev: "nodemon server.js"
    },
    dependencies: deps,
    devDependencies: {
      "nodemon": "^3.0.2"
    }
  };

  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkg, null, 2));
}

// ─── Helper: Generate .env ────────────────────────────────
function generateEnv(targetDir, projectName, answers) {
  let env = `PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/${projectName}
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
`;

  if (answers.cloudinary) {
    env += `
# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
`;
  }

  if (answers.emailProvider === 'gmail') {
    env += `
# Gmail
GMAIL_USER=
GMAIL_PASS=
`;
  }

  if (answers.emailProvider === 'brevo') {
    env += `
# Brevo
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=
`;
  }

  if (answers.paymentProvider === 'razorpay') {
    env += `
# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
`;
  }

  if (answers.paymentProvider === 'stripe') {
    env += `
# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
`;
  }

  if (answers.docker) {
    env += `
# Docker
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password
`;
  }

  fs.writeFileSync(path.join(targetDir, '.env'), env);
  fs.writeFileSync(path.join(targetDir, '.env.example'), env);
}

main().catch(console.error);