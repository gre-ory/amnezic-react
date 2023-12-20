import React from 'react'

// //////////////////////////////////////////////////
// audio player

import { MutableRefObject } from "react";

export interface AudioPlayerInterface {
    unload(): void;
    load( src: string ): void;
    play(): void;
    loadAndPlay( src: string ): void;
    pause(): void;
    toggle(): void;

    // events
    onAudioLoading?: () => void
    onAudioLoaded?: () => void
    onAudioReady?: () => void
    onAudioPlaying?: () => void
    onAudioPausing?: () => void
    onAudioEnd?: () => void
    onAudioReset?: () => void
    onAudioUnload?: () => void
}

export class AudioPlayer implements AudioPlayerInterface {
    audioRef: MutableRefObject<HTMLAudioElement> = React.useRef<HTMLAudioElement>( new Audio() )
    loading = false
    loaded = false
    autoPlay = false
    playing = false    
    
    onAudioLoading?: () => void = undefined
    onAudioLoaded?: () => void = undefined
    onAudioReady?: () => void = undefined
    onAudioPlaying?: () => void = undefined
    onAudioPausing?: () => void = undefined
    onAudioEnd?: () => void = undefined
    onAudioReset?: () => void = undefined
    onAudioUnload?: () => void = undefined


    // //////////////////////////////////////////////////
    // constructor

    constructor() {}
    
    // //////////////////////////////////////////////////
    // unload
    
    unload(): void {
        console.log(`[unload] src=${this.audioRef.current.src}`)
        if ( this.audioRef.current.src ) {
            if ( this.playing ) {
                this.reset()
            }
            this._onAudioUnload()
            if ( this.audioRef.current.src ) {
                this.audioRef.current.removeEventListener( 'loadeddata', this._onAudioLoaded.bind(this) )    
                this.audioRef.current.removeEventListener( 'canplaythrough', this._onAudioReady.bind(this) )
                this.audioRef.current.removeEventListener( 'ended', this._onAudioEnd.bind(this) )
                this.audioRef.current = new Audio()
            }
            this.loading = false
            this.loaded = false
            this.playing = false
            this.onAudioLoading = undefined
            this.onAudioLoaded = undefined
            this.onAudioReady = undefined
            this.onAudioPlaying = undefined
            this.onAudioPausing = undefined
            this.onAudioEnd = undefined
            this.onAudioReset = undefined
        }
    }
    
    // //////////////////////////////////////////////////
    // load

    load( src: string ): void {
        console.log(`[load] src=${src}`)
        if ( this.audioRef.current.src != src ) {

            this.audioRef.current = new Audio( src )
            this.audioRef.current.loop = false
            this.audioRef.current.volume = 1.0

            this.audioRef.current.addEventListener( 'loadeddata', this._onAudioLoaded.bind(this) )    
            this.audioRef.current.addEventListener( 'canplaythrough', this._onAudioReady.bind(this) )
            this.audioRef.current.addEventListener( 'ended', this._onAudioEnd.bind(this) )

            this._onAudioLoading()
        }
    }

    loadAndPlay( src: string ): void {
        console.log(`[load-and-play] src=${src}`)
        this.autoPlay = true
        console.log(`[load-and-play] this.autoPlay=${this.autoPlay}`)
        this.load( src )
    }

    reset(): void {
        console.log( '[reset]' )
        this.playing = false
        this.audioRef.current.pause()
        this.audioRef.current.currentTime = 0
        this._onAudioReset()
    }

    play(): void {
        console.log( '[play]' )
        this.playing = true
        this.audioRef.current.play()
        this._onAudioPlaying()
    }

    pause(): void {
        console.log( '[pause]' )
        this.playing = false
        this.audioRef.current.pause()
        this._onAudioPausing()
    }

    toggle(): void {
        console.log( '[toggle]' )
        if ( this.playing ) {
            this.pause()
        } else {
            this.play()
        }
    }
    
    // //////////////////////////////////////////////////
    // internal events

    _onAudioLoading() {
        console.log( '_onAudioLoading' )
        if ( this.onAudioLoading ) {
            this.onAudioLoading()
        }
    }

    _onAudioLoaded() {
        console.log( '_onAudioLoaded' )
        if ( this.onAudioLoaded ) {
            this.onAudioLoaded()
        }
    }

    _onAudioReady() {
        console.log( '_onAudioReady' )
        if ( this.onAudioReady ) {
            this.onAudioReady()
        }
        console.log( `this.autoPlay: ${this.autoPlay }` )
        if ( this.autoPlay ) {
            this.autoPlay = false
            this.play()
        }
    }

    _onAudioPlaying() {
        console.log( '_onAudioPlaying' )
        if ( this.onAudioPlaying ) {
            this.onAudioPlaying()
        }
    }

    _onAudioPausing() {
        console.log( '_onAudioPausing' )
        if ( this.onAudioPausing ) {
            this.onAudioPausing()
        }
    }

    _onAudioEnd() {
        console.log( '_onAudioEnd' )
        if ( this.onAudioEnd ) {
            this.onAudioEnd()
        }
        this.reset()
    }

    _onAudioReset() {
        console.log( '_onAudioReset' )
        if ( this.onAudioReset ) {
            this.onAudioReset()
        }
    }

    _onAudioUnload() {
        console.log( '_onAudioUnload' )
        if ( this.onAudioUnload ) {
            this.onAudioUnload()
        }
    }

  }