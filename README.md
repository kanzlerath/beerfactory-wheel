# Beer Factory Wheel

Telegram Mini App prototype for Beer Factory (Novosibirsk).

## Start
```bash
npm install
npm run dev
```

## Design
- Full interface redesign: cream paper, warm yellow, green, terracotta and near-black.
- Original Beer Factory logo artwork (optimized WebP in `public`).
- Prize wheel drawn as real SVG geometry in `components/Wheel.tsx`: no oval CSS scaling, 6 segments, fixed pointer, smooth rotation.
- Responsive game, reward result, gift history and rules; accessible labels and reduced-motion support.
- Deliberate demo mode. `DEMO-XXXX` codes are not valid in the restaurant.

## Safety / release checklist
**This is only a visual prototype.** Prize selection is still client-side and demo wins are stored in localStorage. Do not activate real prizes without Telegram initData signature verification on the server, durable storage, redemption logic, rate limiting, secure code generation, prize odds and approved campaign terms. Add genuine restaurant food photography once the assets are supplied/approved.

The bot is [@beerfactorywheelbot](https://t.me/beerfactorywheelbot). Attach an HTTPS Mini App URL via BotFather after deployment.
