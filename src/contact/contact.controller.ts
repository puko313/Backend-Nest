import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { MailService } from '../mail/mail.service';

@Controller('api/contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly mailService: MailService,
  ) { }
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createContactDto: CreateContactDto) {
    console.log(createContactDto)
    this.contactService.create(createContactDto);
    let fn = createContactDto.firstname;
    let ln = createContactDto.lastname;
    let to = createContactDto.email;
    let subject = "Algonrich received your message";
    let mail = "Hi " + createContactDto.firstname + ". Thank you very much for contacting us.";
    console.log(to, subject, mail)
    // this.mailService.sendMail(fn, ln, to, subject, mail);
    return true;
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
