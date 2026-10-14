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
- Minimal interface: brand logo, game title, brief description, wheel and one primary action. No overline badges or prominent prototype disclaimers. Test codes retain the `DEMO-XXXX` prefix and remain invalid for redemption.

## Safety / release checklist
**This is only a visual prototype.** Prize selection is still client-side and demo wins are stored in localStorage. Do not activate real prizes without Telegram initData signature verification on the server, durable storage, redemption logic, rate limiting, secure code generation, prize odds and approved campaign terms. Add genuine restaurant food photography once the assets are supplied/approved.

The bot is [@beerfactorywheelbot](https://t.me/beerfactorywheelbot). Attach an HTTPS Mini App URL via BotFather after deployment.

## Temporary reward photography

Reward screens and gift history use temporary photos served by Unsplash (Unsplash License). This visual prototype is not a representation of actual Beer Factory menu photography. The originals can be replaced by local restaurant assets later by updating `prizes[].image` in `components/Wheel.tsx`. Photo sources: [Bohdan Stocek / beer](https://unsplash.com/photos/a-glass-of-beer-sitting-on-top-of-a-table-y4R3Sbxs5J8), [Nathan Dumlao / burger](https://unsplash.com/photos/burger-on-blue-table-top-hW6ssMsiwcI), [Rashed Moslem / dessert](https://unsplash.com/photos/a-piece-of-cheesecake-on-a-white-plate-z9bIeGp9Kgo), [henry perks / fries](https://unsplash.com/photos/a-tray-of-french-fries-with-dips-and-condiments-O-SfuUoZUDs), [Louis Hansel / garlic bread](https://unsplash.com/photos/garlic-bread-yl33be56sbg). All photos have an automatic branded-color fallback if loading fails. The existing demo prize codes are still invalid for restaurant redemption.
