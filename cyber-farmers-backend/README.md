/admin/ django.contrib.admin.sites.index admin:index
/admin/<app_label>/ django.contrib.admin.sites.app_index admin:app_list
/admin/<url> django.contrib.admin.sites.catch_all_view
/admin/account/emailaddress/ django.contrib.admin.options.changelist_view admin:account_emailaddress_changelist
/admin/account/emailaddress/<path:object_id>/ django.views.generic.base.RedirectView
/admin/account/emailaddress/<path:object_id>/change/ django.contrib.admin.options.change_view admin:account_emailaddress_change
/admin/account/emailaddress/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:account_emailaddress_delete
/admin/account/emailaddress/<path:object_id>/history/ django.contrib.admin.options.history_view admin:account_emailaddress_history
/admin/account/emailaddress/add/ django.contrib.admin.options.add_view admin:account_emailaddress_add
/admin/auth/group/ django.contrib.admin.options.changelist_view admin:auth_group_changelist
/admin/auth/group/<path:object_id>/ django.views.generic.base.RedirectView
/admin/auth/group/<path:object_id>/change/ django.contrib.admin.options.change_view admin:auth_group_change
/admin/auth/group/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:auth_group_delete
/admin/auth/group/<path:object_id>/history/ django.contrib.admin.options.history_viewadmin:auth_group_history
/admin/auth/group/add/ django.contrib.admin.options.add_view admin:auth_group_add
/admin/auth/user/ django.contrib.admin.options.changelist_view admin:auth_user_changelist
/admin/auth/user/<id>/password/ django.contrib.auth.admin.user_change_password admin:auth_user_password_change
/admin/auth/user/<path:object_id>/ django.views.generic.base.RedirectView
/admin/auth/user/<path:object_id>/change/ django.contrib.admin.options.change_view admin:auth_user_change
/admin/auth/user/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:auth_user_delete
/admin/auth/user/<path:object_id>/history/ django.contrib.admin.options.history_viewadmin:auth_user_history
/admin/auth/user/add/ django.contrib.auth.admin.add_view admin:auth_user_add
/admin/authtoken/tokenproxy/ django.contrib.admin.options.changelist_view admin:authtoken_tokenproxy_changelist
/admin/authtoken/tokenproxy/<path:object_id>/ django.views.generic.base.RedirectView
/admin/authtoken/tokenproxy/<path:object_id>/change/ django.contrib.admin.options.change_view admin:authtoken_tokenproxy_change
/admin/authtoken/tokenproxy/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:authtoken_tokenproxy_delete
/admin/authtoken/tokenproxy/<path:object_id>/history/ django.contrib.admin.options.history_view admin:authtoken_tokenproxy_history
/admin/authtoken/tokenproxy/add/ django.contrib.admin.options.add_view admin:authtoken_tokenproxy_add
/admin/autocomplete/ django.contrib.admin.sites.autocomplete_view admin:autocomplete
/admin/jsi18n/ django.contrib.admin.sites.i18n_javascript admin:jsi18n
/admin/login/ django.contrib.admin.sites.login admin:login
/admin/logout/ django.contrib.admin.sites.logout admin:logout
/admin/mpesa/paymenttransaction/ django.contrib.admin.options.changelist_view admin:mpesa_paymenttransaction_changelist
/admin/mpesa/paymenttransaction/<path:object_id>/ django.views.generic.base.RedirectView
/admin/mpesa/paymenttransaction/<path:object_id>/change/ django.contrib.admin.options.change_view admin:mpesa_paymenttransaction_change
/admin/mpesa/paymenttransaction/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:mpesa_paymenttransaction_delete
/admin/mpesa/paymenttransaction/<path:object_id>/history/ django.contrib.admin.options.history_view admin:mpesa_paymenttransaction_history
/admin/mpesa/paymenttransaction/add/ django.contrib.admin.options.add_view admin:mpesa_paymenttransaction_add
/admin/mpesa/wallet/ django.contrib.admin.options.changelist_view admin:mpesa_wallet_changelist
/admin/mpesa/wallet/<path:object_id>/ django.views.generic.base.RedirectView
/admin/mpesa/wallet/<path:object_id>/change/ django.contrib.admin.options.change_view admin:mpesa_wallet_change
/admin/mpesa/wallet/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:mpesa_wallet_delete
/admin/mpesa/wallet/<path:object_id>/history/ django.contrib.admin.options.history_viewadmin:mpesa_wallet_history
/admin/mpesa/wallet/add/ django.contrib.admin.options.add_view admin:mpesa_wallet_add
/admin/password_change/ django.contrib.admin.sites.password_change admin:password_change
/admin/password_change/done/ django.contrib.admin.sites.password_change_done admin:password_change_done
/admin/r/<int:content_type_id>/<path:object_id>/ django.contrib.contenttypes.views.shortcut admin:view_on_site
/admin/reviews/review/ django.contrib.admin.options.changelist_view admin:reviews_review_changelist
/admin/reviews/review/<path:object_id>/ django.views.generic.base.RedirectView
/admin/reviews/review/<path:object_id>/change/ django.contrib.admin.options.change_view admin:reviews_review_change
/admin/reviews/review/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:reviews_review_delete
/admin/reviews/review/<path:object_id>/history/ django.contrib.admin.options.history_viewadmin:reviews_review_history
/admin/reviews/review/add/ django.contrib.admin.options.add_view admin:reviews_review_add
/admin/socialaccount/socialaccount/ django.contrib.admin.options.changelist_view admin:socialaccount_socialaccount_changelist
/admin/socialaccount/socialaccount/<path:object_id>/ django.views.generic.base.RedirectView
/admin/socialaccount/socialaccount/<path:object_id>/change/ django.contrib.admin.options.change_view admin:socialaccount_socialaccount_change
/admin/socialaccount/socialaccount/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:socialaccount_socialaccount_delete
/admin/socialaccount/socialaccount/<path:object_id>/history/ django.contrib.admin.options.history_view admin:socialaccount_socialaccount_history
/admin/socialaccount/socialaccount/add/ django.contrib.admin.options.add_view admin:socialaccount_socialaccount_add
/admin/socialaccount/socialapp/ django.contrib.admin.options.changelist_view admin:socialaccount_socialapp_changelist
/admin/socialaccount/socialapp/<path:object_id>/ django.views.generic.base.RedirectView
/admin/socialaccount/socialapp/<path:object_id>/change/ django.contrib.admin.options.change_view admin:socialaccount_socialapp_change
/admin/socialaccount/socialapp/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:socialaccount_socialapp_delete
/admin/socialaccount/socialapp/<path:object_id>/history/ django.contrib.admin.options.history_view admin:socialaccount_socialapp_history
/admin/socialaccount/socialapp/add/ django.contrib.admin.options.add_view admin:socialaccount_socialapp_add
/admin/socialaccount/socialtoken/ django.contrib.admin.options.changelist_view admin:socialaccount_socialtoken_changelist
/admin/socialaccount/socialtoken/<path:object_id>/ django.views.generic.base.RedirectView
/admin/socialaccount/socialtoken/<path:object_id>/change/ django.contrib.admin.options.change_view admin:socialaccount_socialtoken_change
/admin/socialaccount/socialtoken/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:socialaccount_socialtoken_delete
/admin/socialaccount/socialtoken/<path:object_id>/history/ django.contrib.admin.options.history_view admin:socialaccount_socialtoken_history
/admin/socialaccount/socialtoken/add/ django.contrib.admin.options.add_view admin:socialaccount_socialtoken_add
/admin/tractors/tractor/ import_export.admin.changelist_view admin:tractors_tractor_changelist
/admin/tractors/tractor/<path:object_id>/ django.views.generic.base.RedirectView
/admin/tractors/tractor/<path:object_id>/change/ django.contrib.admin.options.change_view admin:tractors_tractor_change
/admin/tractors/tractor/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:tractors_tractor_delete
/admin/tractors/tractor/<path:object_id>/history/ django.contrib.admin.options.history_view admin:tractors_tractor_history
/admin/tractors/tractor/add/ django.contrib.admin.options.add_view admin:tractors_tractor_add
/admin/tractors/tractor/export/ import_export.admin.export_action admin:tractors_tractor_export
/admin/tractors/tractor/import/ import_export.admin.import_action admin:tractors_tractor_import
/admin/tractors/tractor/process_import/ import_export.admin.process_import admin:tractors_tractor_process_import
/admin/users/customuser/ django.contrib.admin.options.changelist_view admin:users_customuser_changelist
/admin/users/customuser/<path:object_id>/ django.views.generic.base.RedirectView
/admin/users/customuser/<path:object_id>/change/ django.contrib.admin.options.change_view admin:users_customuser_change
/admin/users/customuser/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:users_customuser_delete
/admin/users/customuser/<path:object_id>/history/ django.contrib.admin.options.history_view admin:users_customuser_history
/admin/users/customuser/add/ django.contrib.admin.options.add_view admin:users_customuser_add
/api/auth/google/ dj_rest_auth.registration.views.SocialLoginView google_login
/api/password/reset/ dj_rest_auth.views.PasswordResetView password_reset
/api/password/reset/confirm/ dj_rest_auth.views.PasswordResetConfirmView password_reset_confirm
/api/token/ rest_framework_simplejwt.views.TokenObtainPairView token_obtain_pair
/api/token/refresh/ rest_framework_simplejwt.views.TokenRefreshView token_refresh
/mpesa/check-online/ mpesa.views.CheckTransactionOnline confirm-online
/mpesa/check-transaction/ mpesa.views.CheckTransaction check_transaction
/mpesa/confirm/ mpesa.views.ConfirmView confirm
/mpesa/submit/ mpesa.views.SubmitView submit
/orders/mpesa/confirmation/ orders.views.mpesa_confirmation_callback mpesa-confirmation
/orders/mpesa/validation/ orders.views.mpesa_validation_callback mpesa-validation
/orders/purchase/ orders.views.PurchaseCreateView create-purchase
/reviews/reviews/ reviews.views.ReviewListCreateView review-list-create
/reviews/reviews/<int:pk>/ reviews.views.ReviewRetrieveUpdateDeleteView review-detail
/tractors/redoc/ drf_yasg.views.SchemaView schema-redoc
/tractors/swagger/ drf_yasg.views.SchemaView schema-swagger-ui
/tractors/tractors/ tractors.views.TractorListCreateView tractor-list-create
/tractors/tractors/<int:pk>/ tractors.views.TractorRetrieveUpdateDeleteView tractor-detail
/users/users/ users.views.UserListView user-list
/users/users/change-password/ users.views.ChangePasswordView change-password
/users/users/delete/ users.views.DeleteUserView delete-user
/users/users/login/ users.views.LoginUserView login
/users/users/logout/ users.views.LogoutUserView logout
/users/users/profile/ users.views.UserProfileView profile
/users/users/refresh-token/ users.views.RefreshTokenView refresh-token
/users/users/register/ users.views.RegisterUserView register
/users/users/update/ users.views.UpdateUserView update-user
