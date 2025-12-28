    import { TOKEN_STAGES, TokenStage } from "../types/token";

    export const TOKEN_NAMES = [
    "NovaPulse",
    "LunaFlux",
    "ApexCoin",
    "QuantumX",
    "AtlasPay",
    "Zenith",
    "OrbitChain",
    "EchoToken",
    "Nimbus",
    "Solara",
    "HelixPay",
    "Vertex",
    "CosmoX",
    "Aurora",
    "PulseNet",
    "MetaCoin",
    "Cryptex",
    "Valora",
    "Nexo",
    "BlockZen",
    ] as const;

    export const getRandomStage = (): TokenStage =>
    TOKEN_STAGES[Math.floor(Math.random() * TOKEN_STAGES.length)];

    export const getRandomTokenName = () =>
    TOKEN_NAMES[Math.floor(Math.random() * TOKEN_NAMES.length)];
