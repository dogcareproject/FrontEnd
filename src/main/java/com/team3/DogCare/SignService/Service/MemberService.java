package com.team3.DogCare.SignService.Service;


import com.team3.DogCare.SignService.Controller.SignException;
import com.team3.DogCare.SignService.Domain.Authority;
import com.team3.DogCare.SignService.Domain.Member;
import com.team3.DogCare.SignService.Domain.dto.BanDto;
import com.team3.DogCare.SignService.Domain.dto.SignRequest;
import com.team3.DogCare.SignService.Domain.dto.SignResponse;
import com.team3.DogCare.SignService.Domain.dto.UserRequest;
import com.team3.DogCare.SignService.Repository.MemberRepository;
import com.team3.DogCare.SignService.Security.JwtProvider;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    @Autowired
    private final MemberRepository memberRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtProvider jwtProvider;

    public SignResponse login(SignRequest request) {
        Member member = memberRepository.findByAccount(request.getAccount()).orElseThrow(() ->
                new SignException("잘못된 계정 정보입니다."));
        LocalDateTime now = LocalDateTime.now();

        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new SignException("잘못된 비밀번호입니다.");
        }
        if (member.getBan() != null && now.isBefore(member.getBan())) {
            throw new SignException(member.getBan() + " 까지 계정이 정지되었습니다.");
        }

        // 정상 로그인 처리
        return SignResponse.builder()
                .id(member.getId())
                .account(member.getAccount())
                .name(member.getName())
                .Email(member.getEmail())
                .roles(member.getRoles())
                .token(jwtProvider.createToken(member.getAccount(), member.getRoles()))
                .build();
    }

    public boolean register(SignRequest request) throws Exception {
        try {
            Member member = Member.builder()
                    .id(request.getId())
                    .account(request.getAccount())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .name(request.getName())
                    .email(request.getEmail())
                    .Doctor_check(request.getDoctor_check())
                    .build();

            member.setRoles(Collections.singletonList(Authority.builder().name("ROLE_USER").build()));

            memberRepository.save(member);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }
    public boolean adminRegister(SignRequest request) throws Exception {
        try {
            Member member = Member.builder()
                    .id(request.getId())
                    .account(request.getAccount())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .name(request.getName())
                    .email(request.getEmail())
                    .build();

            member.setRoles(Collections.singletonList(Authority.builder().name("ROLE_ADMIN").build()));

            memberRepository.save(member);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return true;

    }
    public boolean infoChange(UserRequest request){
        Member member = memberRepository.findById(request.getId()).orElseThrow(() ->
                new SignException("해당 계정을 찾을 수 없습니다."));
        member.setPassword(passwordEncoder.encode(request.getPassword()));
        member.setEmail(request.getEmail());

        memberRepository.save(member);

        return true;
    }
    public String FindAccount(UserRequest request){
        Member member = memberRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                new SignException("이메일을 찾을수 없습니다"));

        return member.getAccount();
    }
    public Boolean withdrawal(UserRequest request) throws Exception {
        Member member = memberRepository.findByAccount(request.getAccount()).orElseThrow(() ->
                new Exception("계정을 찾을 수 없습니다."));
        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())){
            return false;
        }
        memberRepository.deleteById(member.getId());

        return true;
    }
    public Boolean accountBan(BanDto request) throws Exception {
        Member member = memberRepository.findById(request.getId()).orElseThrow(() ->
                new Exception("계정을 찾을 수 없습니다."));

        LocalDateTime banned = LocalDateTime.now().plusDays(request.getBantime());
        member.setBan(banned);
        memberRepository.save(member);
        return true;
    }
    public List<Member> getMemberList() {

        return memberRepository.findAll();
    }



}
