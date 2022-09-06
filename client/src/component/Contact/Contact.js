import { Button, TextField } from '@mui/material'
import React from 'react'
import "./Contact.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Contact() {
    return (
        <>
            <section className='contact_section'>
                <div className='container'>
                    <div className='my-5 contact_section_content'>
                        <h2 className='mb-4'>Get in touch</h2>
                        <div className='row'>
                            <div className='col-lg-8 col-12'>
                                <form className='contact_form'>
                                    <div className='row'>
                                        <div className='col-md-6 col-12'>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Name"
                                                type="text"
                                                fullWidth
                                            />
                                        </div>

                                        <div className='col-md-6 col-12'>
                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email"
                                                type="email"
                                                fullWidth
                                            />
                                        </div>


                                        <div className='col-12'>
                                            <TextField
                                                id="subject"
                                                name="subject"
                                                label="Subject"
                                                type="text"
                                                fullWidth
                                                className="my-4"
                                            />
                                        </div>

                                        <div className='col-12'>
                                            <TextField
                                                id="message"
                                                name='message'
                                                label="Message"
                                                type="text"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                maxRows={4}
                                            />
                                        </div>
                                        <div className='col-12'>
                                            <Button variant='contained' className='mt-4'>Send</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='col-lg-4 col-12'>
                                <div className='contact_info my-lg-0 my-5'>
                                    <h3 className='mb-3'>Info</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur elit Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur.</p>
                                    <div className='my-3'>
                                        <a href="tel:88002345678">+91 93282 12630</a>
                                    </div>
                                    <div className='my-3'>
                                        <a href="mailto:kenil@gmail.com">kenil@gmail.com</a>
                                    </div>
                                    <div className='my-3'>
                                        <a href="https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&amp;hl=en&amp;t=v&amp;hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom" className="open-map">221B Baker Street, Vijayvada, Banglore</a>
                                    </div>
                                    <div className="flex my-3 social_icons">
										<a href="#"><FacebookIcon /></a>
										<a href="#" className='mx-4'><InstagramIcon /></a>
										<a href="#"><TwitterIcon /></a>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact