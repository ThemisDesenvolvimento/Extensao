import { ServiceProvider as Provider } from "@services/base/serviceProvider";

export declare global {
    readonly var ServiceProvider: typeof Provider;
}