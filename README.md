# Canteen-Management-System

A Canteen Management Fullstack Web App

## Requirements

- Node 21
- JAVA 21
- MySQL 8.2
- Nginx 1.18

## 功能特点

这是一个用于校内服务的餐厅管理系统，系统服务用户分为：系统管理员、食堂管理员、师生用户，旨在提供一个方便的平台，让管理员能管理食堂信息、处理评价和投诉，同时让师生用户可以查看食堂信息、评价菜品、参与投票和社区交流。

1. 食堂信息管理：管理员可以轻松管理食堂的基本信息，包括名称、位置、营业时间等。

2. 菜品管理：管理员可以方便地维护菜品信息，包括添加、删除和修改菜品，设置价格和促销信息。

3. 评价和回复：管理员可以查看用户对菜品和食堂的评价，回复用户的反馈和投诉，提供及时的服务和解决方案。

4. 活动公告：管理员可以发布促销活动和其他公告信息，吸引用户关注和参与。

5. 投票调查：管理员可以设计投票调查，了解用户的喜好和需求，为食堂提供改进和创新的方向。

6. 交流社区：用户可以在社区平台上分享点餐经验、交流口味偏好，并与其他用户互动、评论和点赞。

7. 用户评价和等级：用户可以对菜品进行评价和打分，系统根据用户的活跃度和评价质量给予不同的等级，提供参考价值较高的评分结果。

8. 实时消息系统：用户可以与其他用户进行实时在线交流，方便提问、咨询和分享。

9. 综合排名和评分：系统根据用户的评价和投票结果，计算食堂的综合评分和排名，为用户提供参考和选择。

10. 用户行为分析：系统通过智能机制分析用户行为，识别非法恶意行为，确保菜品评价的真实性和公正性。

这些功能特点使得食堂管理系统能够提供高效的食堂管理和良好的用户体验，促进食堂和用户之间的互动和沟通。

## Tech Stack

- Front End：React (Create-React-App), Tailwind CSS
- Back End: Spring-Boot (RESTFul API + WebSocket), Servlet (Listener, Filter), MySQL
- Deployment: Docker Compose

## File Structure

```
├── react/                # react
├── spring-boot/          # springboot
│         ├── api/        # 前后接口
│         ├── dao/        # 数据访问层
│         ├── logic/      # 业务逻辑层
│         ├── model/      # 数据结构和关系
│         └── util/       # 工具组件
├── .gitattributes
└── README.md
```

## Source Code & Demo

- Source Code: [https://github.com/windsnow1025/Canteen-Management-System](https://github.com/windsnow1025/Canteen-Management-System)
- Demo: [https://learn.windsnow1025.com](https://learn.windsnow1025.com)

## API文档

API文档请参考：`/sprint-boot/document/`

1. 餐厅功能
    - 获取餐厅信息
    - 删除餐厅
    - 更新餐厅信息

2. 投诉功能
    - 获取投诉信息
    - 添加投诉
    - 更新投诉结果
    - 删除投诉

3. 餐厅菜品管理功能
    - 获取所有菜品信息
    - 获取菜品名称列表
    - 根据菜品名称查询菜品信息
    - 根据菜品ID查询菜品信息
    - 添加菜品
    - 更新菜品信息
    - 删除菜品

4. 用户管理功能
    - 获取用户信息
    - 删除用户
    - 用户登录
    - 用户注册
    - 修改用户密码
    - 修改用户类型
    - 修改用户等级

5. 投票管理功能
    - 获取所有投票信息
    - 根据餐厅ID获取投票信息
    - 根据投票ID获取投票信息
    - 创建新的投票活动
    - 更新投票结果
    - 删除投票活动

## References

- React Docs：[https://react.dev/](https://react.dev/)
- Spring-Boot Docs：[https://spring.io/](https://spring.io/)
