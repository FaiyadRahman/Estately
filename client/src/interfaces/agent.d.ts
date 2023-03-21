import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    firstname: string,
    lastname: string
    email: string,
    avatar: string,
    phone: string,
    location: string,
    properties: string[]
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
