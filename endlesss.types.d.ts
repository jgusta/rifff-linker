// import type { Rifff, Loop, State } from "./util/types.ts";
export{}
declare global {
  // interface Window {
  //   // your types here!
  //   rifffIcon: RifffIcon;
  //   RifffBase: RifffBase;
  //   AutoLevelMixer: AutoLevelMixer;
  //   player: RifffPlayer
  //   RifffPlayer: RifffPlayer
  // }
}

// declare const window: Window;

// declare interface RifffIcon {
//   degreesToRadians(degrees: number): number;
//   render: (
//     rifff: Rifff,
//     canvas: HTMLCanvasElement,
//     player: RifffPlayer,
//     animate: boolean,
//     alpha: boolean,
//     backgroundColor: string
//   ) => void;
//   getCanvas(): HTMLCanvasElement;
//   setCanvas(): void;
// }

// declare interface RifffBase {
//   getBps(): number
//   getLoops(): Loop[]
//   getSlots(): string
//   state: State
//   loadBuffers(): ArrayBuffer[]
// }

// declare interface Looper {

// }

type Token = { cancelled: boolean }
// declare interface AutoLevelMixer {
//   decrementValueReady?: boolean
//   smallWindowCounter?: number
//   smallWindowSize?: number
//   sumOfSquares?: number
//   rmsHistorySize?: number
//   rmsHistory?: number[]
//   rmsHistoryIndex?: number
//   // parameters
//   thresholdInDecibels?: number
//   levelReductionFactor?: number
//   // observed values
//   decrementValue?: number
//   levelDifference?: number
//   minDecrementValue?: number
//   maxLevelDifference?: number
//   resetMaximumAndMinimumValues(): void
//   /** Returns true if we have a new level decrement value ready */
//   hasNewGainLevelReady(): boolean
//   /** return the value in dB of volume reduction to be applied to all loops */
//   getDecrementValue(indicateValueIsConsumed: boolean): number
//   /** return the minimum decrement value observed */
//   getMinDecrementValue(): number
//   /** return the amount over the threshold in dB that the level is currently at */
//   getLevelDifference(): number
//   /** return the maximum level difference observed */
//   getMaxLevelDifference(): number
//   /** Sets the auto level mixer detection threshold in decibels */
//   setThresholdInDecibels(decibels: number): void
//   /** Sets the factor by which any excess level is scaled to determine the amount to turn down the signal */
//   setLevelReductionFactor(v: number): void
//   /** return the auto level mixer detection threshold in decibels */
//   getThresholdInDecibels(): number
//   /** return the factor by which any excess level is scaled to determine the amount to turn down the signal */
//   getLevelReductionFactor(): number
//   processBlock(buffer: AudioBuffer): void
// }

declare namespace RifffPlayer {
  function decibelsToGain(x: number): number
}

// declare interface RifffPlayer {
//   rms: number
//   startTime: number
//   pausedAt: number
//   isPlaying: boolean
//   shouldPlay: boolean
//   needsReload: boolean
//   cancelTokens: Token[]
//   audioCtx: AudioContext
//   loopers: Looper[]
//   masterGainNode: GainNode
//   analyser: AnalyserNode
//   analysisBuffer: Float32Array
//   tearDown(): void
//   get rifff_id(): string | undefined
//   getCurrentTime(): number
//   getCurrentBeat(): number
//   getBps(): number
//   getBPM(): number
//   getBeatLength(): number
//   getRMS(): number
//   get rifffData(): Rifff | null
//   setRifff(rifff: Rifff): Promise<void>
//   decodeBuffer(buffer: ArrayBuffer): Promise<AudioBuffer>
//   loadBuffers(token: Token): ArrayBuffer
//   createLoopers(buffers: ArrayBuffer[], token: Token): Promise<AudioBuffer[]>
//   reloadPlayer(): Promise<void>
//   getGainForLooper(looper: Looper): number
//   getRateForLooper(looper: Looper): number
//   play(): Promise<void>

//   pause(): void

//   stop(): void

//   playSynced(): void
// }