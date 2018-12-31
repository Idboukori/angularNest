export class CreateUserDto {
  name: string;
  email: string;
  constructor(n: string, e: string) {
    this.name = n;
    this.email = e;
   }
}