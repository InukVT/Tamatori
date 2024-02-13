import { Injectable, computed, effect, signal } from '@angular/core';
import * as PIXI from 'pixi.js';

@Injectable({ providedIn: 'root' })
export class Pixi {
    private readonly PIXI = signal<typeof PIXI | null>(null);
    private readonly internalApp = signal<PIXI.Application | null>(null);
    public readonly app = computed(() => this.internalApp());

    private readonly _setApp = effect(() => {
        console.log('AppInjectable init');
        const PIXI = this.PIXI();
        if (!PIXI) return;

        const app = new PIXI.Application();

        app.init().then(() => {
            this.internalApp.set(app);
        });
    });

    constructor() {
        // This is actually to make HMR work
        import('pixi.js').then((PIXI) => {
            this.PIXI.set(PIXI);
        });
    }
}
