
## Installation

```bash
git clone --recurse-submodules https://github.com/deworkerai/twitter-worker.git
pnpm install
```

Copy .env.example to .env, and config the .env file.

## Usage

If you have not registered a peer with this worker, you must [read it](https://github.com/deworkerai/deworker-cli?tab=readme-ov-file#start-a-worker) before running the worker.

**Notice: you don't need clone the example worker mentioned above, just replace the example repo url with this repo url**

We assume that you have already registered a peer with this worker. Now you can start the worker by the following command:

```bash
deworker peer start
```