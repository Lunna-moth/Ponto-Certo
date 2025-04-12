export class Registro {
  public id: number;
  public dataHora: string; // string ISO vinda do back-end
  public tipo: number; // 0, 1 ou 2 (por ex)
  public latitude: number;
  public longitude: number;
  public usuarioId: number;
  public usuario?: any; // ou tipo Usuario se preferir, mas como vem null pode deixar any
}
