import { writable } from 'svelte/store';

const blankState = { value: '', state: 0 };

export const activeTile = writable('R0T0');
export const tileStates = writable({'R0T0': {...blankState}, 'R0T1': {...blankState}, 'R0T2': {...blankState}, 'R0T3': {...blankState}, 'R0T4': {...blankState}, 
                                    'R1T0': {...blankState}, 'R1T1': {...blankState}, 'R1T2': {...blankState}, 'R1T3': {...blankState}, 'R1T4': {...blankState}, 
                                    'R2T0': {...blankState}, 'R2T1': {...blankState}, 'R2T2': {...blankState}, 'R2T3': {...blankState}, 'R2T4': {...blankState}, 
                                    'R3T0': {...blankState}, 'R3T1': {...blankState}, 'R3T2': {...blankState}, 'R3T3': {...blankState}, 'R3T4': {...blankState}, 
                                    'R4T0': {...blankState}, 'R4T1': {...blankState}, 'R4T2': {...blankState}, 'R4T3': {...blankState}, 'R4T4': {...blankState}, 
                                    'R5T0': {...blankState}, 'R5T1': {...blankState}, 'R5T2': {...blankState}, 'R5T3': {...blankState}, 'R5T4': {...blankState}
                                });
export const results = writable([]);
export const errorMsg = writable("");
export const highlightRow = writable(null);
export const highlightColumn = writable(null);