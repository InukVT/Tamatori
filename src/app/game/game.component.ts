import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
    WritableSignal,
    effect,
    signal,
    Renderer2,
} from '@angular/core';
import { Pixi } from './app.injectable';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent {
    private readonly gameCanvas: WritableSignal<HTMLElement | null> =
        signal(null);

    private readonly _setContainer = effect(() => {
        const canvas = this.gameCanvas();
        const app = this.pixi.app();

        if (!canvas || !app) return;

        this.renderer.appendChild(canvas, app.canvas);
    });

    private readonly setupGame = effect(() => {
        const app = this.pixi.app();

        if (!app) return;

        app.renderer.background.color = 0x061639;
    });

    @ViewChild('gameContainer', { static: true })
    set canvas(canvas: ElementRef<HTMLElement>) {
        this.gameCanvas.set(canvas.nativeElement);
    }

    constructor(
        private readonly renderer: Renderer2,
        private readonly pixi: Pixi
    ) {}
}
