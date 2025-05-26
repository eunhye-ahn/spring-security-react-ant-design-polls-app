package com.example.polls.service;

import com.example.polls.exception.ResourceNotFoundException;
import com.example.polls.model.Notification;
import com.example.polls.model.NotificationType;
import com.example.polls.model.Poll;
import com.example.polls.model.User;
import com.example.polls.repository.NotificationRepository;
import com.example.polls.repository.UserRepository;
import javassist.compiler.NoFieldException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.remote.NotificationResult;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public void sendNewPollNotification(Long userId, Poll poll) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("해당 사용자(ID: " + userId + ")를 찾을 수 없습니다.");
        }

        User user = optionalUser.get();

        Notification notification = new Notification();
        notification.setType(NotificationType.NEW_POLL);
        notification.setMessage("새 투표가 생성되었습니다");
        notification.setRelatedUrl("/polls/" + poll.getId());
        notification.setUser(user);
        notification.setRead(false);

        notificationRepository.save(notification);

    }

}
