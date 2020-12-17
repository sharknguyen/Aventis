import { Injectable } from '@angular/core';
import { BgFinanzplan, BgPosition, Personen, WhPositionsart, BgSilAHVBeitrag } from '@app/kiss4-sozialhilfe/finanzplan/vermogen/models';

@Injectable()
export class VermogenService {

    /**
     * get data BgPosition grid
     * @param data
     */
    static getBgPosition(data: any): Array<any> {
        return data.map(item => new BgPosition(item));
    }

    /**
     * get data BgFinanzplan grid
     * @param data
     */
    static getBgFinanzplan(data: any): Array<any> {
        return data.map(item => new BgFinanzplan(item));
    }

    /**
     * get data Personen selectbox
     * @param data
     */
    static getPersonen(data: any): Array<any> {
        return data.map(item => new Personen(item));
    }

    /**
     * get data Art des Vermogen selectbox
     * @param data
     */
    static getWhPositionsart(data: any): Array<any> {
        return data.map(item => new WhPositionsart(item));
    }

    /**
     * Delete BgPosition
     * @param data
     */
    static deleteBgPosition = (data: any) => data;

    /**
     * Calculate Freibetrag & Angerechnet
     */
    static getFreibetrag = (data: any) => data;

    /**
     * Insert BgPosition
     */
    static insertBgPosition = (data: any) => data;

    /**
     * Update BgPosition
     */
    static updateBgPosition = (data: any) => data;

    /**
     * Get status code
     * @param data
     */
    static bgSilAHVBeitragAdapter = (data: any) => data[0];
}
