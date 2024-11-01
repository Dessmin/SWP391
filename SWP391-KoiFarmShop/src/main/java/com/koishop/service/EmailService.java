package com.koishop.service;

import com.koishop.models.user_model.EmailDetail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private TemplateEngine templateEngine;

    public void sentEmail(EmailDetail emailDetail) {

        try {
            Context context = new Context();
            context.setVariable("name", emailDetail.getUser().getUsername());
            context.setVariable("button", "Go to KoiShop");
            context.setVariable("link", emailDetail.getLink());

            String template = templateEngine.process("welcome", context);

            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getUser().getEmail());
            mimeMessageHelper.setText(template, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());
            javaMailSender.send(mimeMessage);
        }catch (MessagingException e) {
            System.out.println("Error sending email");
        }
    }

    public void sendResetPasswordEmail(EmailDetail emailDetail) {
        try {
            Context context = new Context();
            context.setVariable("name", emailDetail.getUser().getUsername());
            context.setVariable("link", emailDetail.getLink());
            String template = templateEngine.process("reset-password", context);
            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getUser().getEmail());
            mimeMessageHelper.setText(template, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("Error sending reset password email");
        }
    }
    @Async
    public void sendPaymentSuccessEmail(EmailDetail emailDetail, String paymentAmount, String transactionId) {
        try {
            Context context = new Context();
            context.setVariable("name", emailDetail.getUser().getUsername());
            context.setVariable("paymentAmount", paymentAmount);
            context.setVariable("transactionId", transactionId);
            context.setVariable("link", emailDetail.getLink());
            String template = templateEngine.process("payment", context);
            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@koishop.vn");
            mimeMessageHelper.setTo(emailDetail.getUser().getEmail());
            mimeMessageHelper.setText(template, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("Error sending email");
        }
    }
}
