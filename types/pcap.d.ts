export type Packet = {
    number: number;
    timestamp: Date;
    source_IPv4: string;
    source_IPv6: string;
    source_port: number;
    destination_IPv4: string;
    destination_IPv6: string;
    destination_port: number;
    protocol: string;
    length: number;
    flags: string;
    ttl: number;
    info: string;
    data_Base64: string;
    data_Hex: string;
}

export type PackageStream = Packet[];